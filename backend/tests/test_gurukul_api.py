import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://bangalore-sangeet.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_health(client):
    r = client.get(f"{API}/health", timeout=20)
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "healthy"


def test_create_demo_booking_full(client):
    payload = {
        "name": "TEST_Anika Sharma",
        "phone": "9876543210",
        "email": "test_anika@example.com",
        "age": "12",
        "course": "Hindustani Vocal",
        "mode": "online",
        "message": "Looking for evening slots",
    }
    r = client.post(f"{API}/demo-bookings", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "created_at" in data
    for k, v in payload.items():
        assert data[k] == v


def test_create_demo_booking_minimal(client):
    payload = {"name": "TEST_Minimal", "phone": "9000000000"}
    r = client.post(f"{API}/demo-bookings", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["phone"] == payload["phone"]
    assert data.get("email") is None


def test_demo_booking_validation_missing_fields(client):
    # missing both name and phone
    r = client.post(f"{API}/demo-bookings", json={}, timeout=20)
    assert r.status_code == 422
    # missing phone
    r2 = client.post(f"{API}/demo-bookings", json={"name": "TEST_X"}, timeout=20)
    assert r2.status_code == 422
    # missing name
    r3 = client.post(f"{API}/demo-bookings", json={"phone": "9000000000"}, timeout=20)
    assert r3.status_code == 422


def test_list_demo_bookings_latest_first(client):
    # ensure we have at least 2 bookings
    a = client.post(f"{API}/demo-bookings", json={"name": "TEST_First", "phone": "9111111111"}, timeout=20).json()
    b = client.post(f"{API}/demo-bookings", json={"name": "TEST_Second", "phone": "9222222222"}, timeout=20).json()
    r = client.get(f"{API}/demo-bookings", timeout=20)
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list) and len(items) >= 2
    ids = [i["id"] for i in items]
    # the most recent one should come before the earlier one
    assert ids.index(b["id"]) < ids.index(a["id"])
    # confirm _id not leaked
    for it in items[:5]:
        assert "_id" not in it
