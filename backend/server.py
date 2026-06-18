from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
import base64
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, UploadFile, File, Form
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr


# ---------------------------------------------------------------- config
JWT_ALGO = "HS256"
JWT_EXPIRY_HOURS = 24 * 7
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


# ---------------------------------------------------------------- auth utils
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode(), hashed.encode())
    except Exception:
        return False


def create_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGO)


async def get_current_admin(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth[7:]
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGO])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# ---------------------------------------------------------------- models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AuthUser(BaseModel):
    id: str
    email: str
    name: str
    role: str


class LoginResponse(BaseModel):
    token: str
    user: AuthUser


class DemoBookingCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=5, max_length=30)
    email: Optional[EmailStr] = None
    age: Optional[str] = Field(default=None, max_length=30)
    course: Optional[str] = Field(default=None, max_length=120)
    mode: Optional[str] = Field(default=None, max_length=30)
    message: Optional[str] = Field(default=None, max_length=2000)


class DemoBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    age: Optional[str] = None
    course: Optional[str] = None
    mode: Optional[str] = None
    message: Optional[str] = None
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class GalleryItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    year: str
    category: str = "Performance"
    caption: str = ""
    image_data: str  # data URL or base64 + mime
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class GalleryUpdate(BaseModel):
    year: Optional[str] = None
    category: Optional[str] = None
    caption: Optional[str] = None
    order: Optional[int] = None


class TestimonialIn(BaseModel):
    quote: str = Field(min_length=1, max_length=2000)
    author: str = Field(min_length=1, max_length=200)
    role: Optional[str] = ""
    order: int = 0


class Testimonial(TestimonialIn):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------------------------------------------------------------- app
app = FastAPI(title="Gurukul School of Music API")
api = APIRouter(prefix="/api")


@api.get("/")
async def root():
    return {"message": "Gurukul School of Music API", "status": "ok"}


@api.get("/health")
async def health():
    return {"status": "healthy"}


# ---------------------------------------------------------------- auth routes
@api.post("/auth/login", response_model=LoginResponse)
async def login(payload: LoginRequest):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(user["id"], user["email"])
    return LoginResponse(
        token=token,
        user=AuthUser(id=user["id"], email=user["email"], name=user.get("name", "Admin"), role=user.get("role", "admin")),
    )


@api.get("/auth/me", response_model=AuthUser)
async def me(user: dict = Depends(get_current_admin)):
    return AuthUser(id=user["id"], email=user["email"], name=user.get("name", "Admin"), role=user.get("role", "admin"))


# ---------------------------------------------------------------- public bookings
@api.post("/demo-bookings", response_model=DemoBooking)
async def create_demo_booking(payload: DemoBookingCreate):
    booking = DemoBooking(**payload.model_dump())
    doc = booking.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.demo_bookings.insert_one(doc)
    except Exception:
        logging.exception("Failed to persist booking")
        raise HTTPException(status_code=500, detail="Failed to save booking")
    return booking


@api.get("/demo-bookings", response_model=List[DemoBooking])
async def list_demo_bookings(limit: int = 200, user: dict = Depends(get_current_admin)):
    cursor = db.demo_bookings.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(length=limit)
    for it in items:
        if isinstance(it.get("created_at"), str):
            try:
                it["created_at"] = datetime.fromisoformat(it["created_at"])
            except Exception:
                pass
    return items


@api.put("/demo-bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str, user: dict = Depends(get_current_admin)):
    if status not in {"new", "contacted", "scheduled", "closed"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    res = await db.demo_bookings.update_one({"id": booking_id}, {"$set": {"status": status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"ok": True, "status": status}


# ---------------------------------------------------------------- public gallery
@api.get("/gallery")
async def list_gallery():
    cursor = db.gallery.find({}, {"_id": 0}).sort([("year", -1), ("order", 1), ("created_at", 1)])
    items = await cursor.to_list(length=500)
    return items


@api.post("/admin/gallery", response_model=GalleryItem)
async def upload_gallery_item(
    year: str = Form(...),
    category: str = Form("Performance"),
    caption: str = Form(""),
    order: int = Form(0),
    file: UploadFile = File(...),
    user: dict = Depends(get_current_admin),
):
    if year not in {"2024", "2025", "2026"}:
        raise HTTPException(status_code=400, detail="Year must be 2024, 2025 or 2026")
    contents = await file.read()
    if len(contents) > 6 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image too large (max 6 MB)")
    mime = file.content_type or "image/jpeg"
    if not mime.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    b64 = base64.b64encode(contents).decode()
    data_url = f"data:{mime};base64,{b64}"
    item = GalleryItem(year=year, category=category, caption=caption, image_data=data_url, order=order)
    doc = item.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.gallery.insert_one(doc)
    return item


@api.put("/admin/gallery/{item_id}", response_model=GalleryItem)
async def update_gallery_item(item_id: str, payload: GalleryUpdate, user: dict = Depends(get_current_admin)):
    update = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    res = await db.gallery.find_one_and_update({"id": item_id}, {"$set": update}, return_document=True)
    if not res:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    res.pop("_id", None)
    if isinstance(res.get("created_at"), str):
        try:
            res["created_at"] = datetime.fromisoformat(res["created_at"])
        except Exception:
            pass
    return GalleryItem(**res)


@api.delete("/admin/gallery/{item_id}")
async def delete_gallery_item(item_id: str, user: dict = Depends(get_current_admin)):
    res = await db.gallery.delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    return {"ok": True}


# ---------------------------------------------------------------- testimonials
@api.get("/testimonials", response_model=List[Testimonial])
async def list_testimonials():
    cursor = db.testimonials.find({}, {"_id": 0}).sort([("order", 1), ("created_at", 1)])
    items = await cursor.to_list(length=500)
    for it in items:
        if isinstance(it.get("created_at"), str):
            try:
                it["created_at"] = datetime.fromisoformat(it["created_at"])
            except Exception:
                pass
    return items


@api.post("/admin/testimonials", response_model=Testimonial)
async def create_testimonial(payload: TestimonialIn, user: dict = Depends(get_current_admin)):
    item = Testimonial(**payload.model_dump())
    doc = item.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.testimonials.insert_one(doc)
    return item


@api.put("/admin/testimonials/{item_id}", response_model=Testimonial)
async def update_testimonial(item_id: str, payload: TestimonialIn, user: dict = Depends(get_current_admin)):
    res = await db.testimonials.find_one_and_update(
        {"id": item_id}, {"$set": payload.model_dump()}, return_document=True
    )
    if not res:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    res.pop("_id", None)
    if isinstance(res.get("created_at"), str):
        try:
            res["created_at"] = datetime.fromisoformat(res["created_at"])
        except Exception:
            pass
    return Testimonial(**res)


@api.delete("/admin/testimonials/{item_id}")
async def delete_testimonial(item_id: str, user: dict = Depends(get_current_admin)):
    res = await db.testimonials.delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"ok": True}


# ---------------------------------------------------------------- mount + middleware
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------- startup
@app.on_event("startup")
async def startup():
    try:
        await db.users.create_index("email", unique=True)
        await db.gallery.create_index([("year", 1), ("order", 1)])
        await db.testimonials.create_index("order")
        await db.demo_bookings.create_index([("created_at", -1)])
    except Exception:
        logger.exception("index creation failed")

    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower().strip()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    hashed = hash_password(admin_password)
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hashed,
            "name": "Gurukul Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded admin user %s", admin_email)
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hashed}})
        logger.info("Updated admin password for %s", admin_email)


@app.on_event("shutdown")
async def shutdown():
    client.close()
