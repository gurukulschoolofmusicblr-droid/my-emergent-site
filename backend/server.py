from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Gurukul School of Music API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Gurukul School of Music API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "service": "gurukul-api"}


@api_router.post("/demo-bookings", response_model=DemoBooking)
async def create_demo_booking(payload: DemoBookingCreate):
    booking = DemoBooking(**payload.model_dump())
    doc = booking.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.demo_bookings.insert_one(doc)
    except Exception as e:
        logging.exception("Failed to persist demo booking")
        raise HTTPException(status_code=500, detail="Failed to save booking") from e
    return booking


@api_router.get("/demo-bookings", response_model=List[DemoBooking])
async def list_demo_bookings(limit: int = 100):
    cursor = db.demo_bookings.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(length=limit)
    for it in items:
        if isinstance(it.get("created_at"), str):
            it["created_at"] = datetime.fromisoformat(it["created_at"])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
