"""Admin API tests: auth, gallery, testimonials, demo-bookings (admin actions)."""
import base64
import io
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://bangalore-sangeet.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "gurukulschoolofmusicblr@gmail.com"
ADMIN_PASSWORD = "Guru@123"

# 1x1 PNG (transparent)
PNG_BYTES = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGD4DwABBAEAfbLI3wAAAABJRU5ErkJggg=="
)


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    return s


@pytest.fixture(scope="session")
def token(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and "user" in data
    assert data["user"]["email"].lower() == ADMIN_EMAIL.lower()
    return data["token"]


@pytest.fixture
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# -------------------- AUTH --------------------
class TestAuth:
    def test_login_success(self, api):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        body = r.json()
        assert isinstance(body["token"], str) and len(body["token"]) > 10
        assert body["user"]["role"] == "admin"
        assert body["user"]["email"] == ADMIN_EMAIL

    def test_login_invalid(self, api):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
        assert r.status_code == 401

    def test_me_with_token(self, api, auth_headers):
        r = api.get(f"{BASE_URL}/api/auth/me", headers=auth_headers)
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL

    def test_me_without_token(self, api):
        r = api.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 401


# -------------------- GALLERY --------------------
class TestGallery:
    created_id = None

    def test_public_gallery_list(self, api):
        r = api.get(f"{BASE_URL}/api/gallery")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_upload_requires_auth(self, api):
        files = {"file": ("a.png", PNG_BYTES, "image/png")}
        data = {"year": "2026", "category": "Performance", "caption": "x"}
        r = api.post(f"{BASE_URL}/api/admin/gallery", data=data, files=files)
        assert r.status_code == 401

    def test_upload_success_png(self, api, auth_headers):
        files = {"file": ("test.png", PNG_BYTES, "image/png")}
        data = {"year": "2026", "category": "Performance", "caption": "TEST_caption", "order": 0}
        r = api.post(f"{BASE_URL}/api/admin/gallery", data=data, files=files, headers=auth_headers)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["year"] == "2026"
        assert body["caption"] == "TEST_caption"
        assert body["image_data"].startswith("data:image/png;base64,")
        assert "id" in body
        TestGallery.created_id = body["id"]

        # verify persisted
        r2 = api.get(f"{BASE_URL}/api/gallery")
        ids = [i["id"] for i in r2.json()]
        assert TestGallery.created_id in ids

    def test_upload_rejects_non_image(self, api, auth_headers):
        files = {"file": ("note.txt", b"hello", "text/plain")}
        data = {"year": "2026"}
        r = api.post(f"{BASE_URL}/api/admin/gallery", data=data, files=files, headers=auth_headers)
        assert r.status_code == 400

    def test_upload_rejects_oversize(self, api, auth_headers):
        big = b"\x00" * (6 * 1024 * 1024 + 100)
        files = {"file": ("big.png", big, "image/png")}
        data = {"year": "2026"}
        r = api.post(f"{BASE_URL}/api/admin/gallery", data=data, files=files, headers=auth_headers)
        assert r.status_code == 413

    def test_invalid_year_rejected(self, api, auth_headers):
        files = {"file": ("a.png", PNG_BYTES, "image/png")}
        data = {"year": "1999"}
        r = api.post(f"{BASE_URL}/api/admin/gallery", data=data, files=files, headers=auth_headers)
        assert r.status_code == 400

    def test_delete_gallery(self, api, auth_headers):
        assert TestGallery.created_id, "must upload first"
        r = api.delete(f"{BASE_URL}/api/admin/gallery/{TestGallery.created_id}", headers=auth_headers)
        assert r.status_code == 200
        # verify removed
        r2 = api.get(f"{BASE_URL}/api/gallery")
        ids = [i["id"] for i in r2.json()]
        assert TestGallery.created_id not in ids

    def test_delete_requires_auth(self, api):
        r = api.delete(f"{BASE_URL}/api/admin/gallery/some-id")
        assert r.status_code == 401


# -------------------- TESTIMONIALS --------------------
class TestTestimonials:
    created_id = None

    def test_public_list(self, api):
        r = api.get(f"{BASE_URL}/api/testimonials")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_create_requires_auth(self, api):
        r = api.post(f"{BASE_URL}/api/admin/testimonials", json={"quote": "x", "author": "y"})
        assert r.status_code == 401

    def test_create_success(self, api, auth_headers):
        payload = {"quote": "TEST_great school", "author": "TEST_Author", "role": "Parent", "order": 1}
        r = api.post(f"{BASE_URL}/api/admin/testimonials", json=payload, headers=auth_headers)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["quote"] == "TEST_great school"
        assert body["author"] == "TEST_Author"
        TestTestimonials.created_id = body["id"]

    def test_update(self, api, auth_headers):
        tid = TestTestimonials.created_id
        assert tid
        payload = {"quote": "TEST_updated quote", "author": "TEST_Author", "role": "Student", "order": 2}
        r = api.put(f"{BASE_URL}/api/admin/testimonials/{tid}", json=payload, headers=auth_headers)
        assert r.status_code == 200
        assert r.json()["quote"] == "TEST_updated quote"
        assert r.json()["role"] == "Student"

    def test_update_requires_auth(self, api):
        r = api.put(f"{BASE_URL}/api/admin/testimonials/x", json={"quote": "a", "author": "b"})
        assert r.status_code == 401

    def test_delete(self, api, auth_headers):
        tid = TestTestimonials.created_id
        r = api.delete(f"{BASE_URL}/api/admin/testimonials/{tid}", headers=auth_headers)
        assert r.status_code == 200
        # confirm removed
        r2 = api.get(f"{BASE_URL}/api/testimonials")
        ids = [i["id"] for i in r2.json()]
        assert tid not in ids

    def test_delete_requires_auth(self, api):
        r = api.delete(f"{BASE_URL}/api/admin/testimonials/some-id")
        assert r.status_code == 401


# -------------------- DEMO BOOKINGS --------------------
class TestDemoBookings:
    created_id = None

    def test_list_requires_auth(self, api):
        r = api.get(f"{BASE_URL}/api/demo-bookings")
        assert r.status_code == 401

    def test_public_create(self, api):
        payload = {"name": "TEST_Booker", "phone": "9999999999", "course": "Vocals", "mode": "Online"}
        r = api.post(f"{BASE_URL}/api/demo-bookings", json=payload)
        assert r.status_code == 200
        body = r.json()
        assert body["name"] == "TEST_Booker"
        assert body["status"] == "new"
        TestDemoBookings.created_id = body["id"]

    def test_list_with_auth(self, api, auth_headers):
        r = api.get(f"{BASE_URL}/api/demo-bookings", headers=auth_headers)
        assert r.status_code == 200
        bookings = r.json()
        assert isinstance(bookings, list)
        ids = [b["id"] for b in bookings]
        assert TestDemoBookings.created_id in ids

    def test_status_update_valid(self, api, auth_headers):
        bid = TestDemoBookings.created_id
        r = api.put(f"{BASE_URL}/api/demo-bookings/{bid}/status?status=contacted", headers=auth_headers)
        assert r.status_code == 200
        assert r.json()["status"] == "contacted"
        # verify persisted
        r2 = api.get(f"{BASE_URL}/api/demo-bookings", headers=auth_headers)
        target = next((b for b in r2.json() if b["id"] == bid), None)
        assert target and target["status"] == "contacted"

    def test_status_update_invalid(self, api, auth_headers):
        bid = TestDemoBookings.created_id
        r = api.put(f"{BASE_URL}/api/demo-bookings/{bid}/status?status=garbage", headers=auth_headers)
        assert r.status_code == 400

    def test_status_update_requires_auth(self, api):
        r = api.put(f"{BASE_URL}/api/demo-bookings/x/status?status=contacted")
        assert r.status_code == 401
