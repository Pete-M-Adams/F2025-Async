from fastapi.testclient import TestClient
from controller import init

init()

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"capturedHello": "capturedWorld"}


def test_get_artists_success():
    # This test assumes that a specific combination of genre, country, and city
    # will yield a result. Based on the provided main.py, the global_music_data
    # is processed, but its content is not visible. For a real test, we'd need
    # to mock process_music_data or ensure the data contains this entry.
    # For now, we'll use a placeholder that would ideally exist.
    response = client.get("/artists?genre=rock&country=usa&city=newyork")
    assert response.status_code == 200
    # The actual artist name would depend on the global_music_data content
    # For this example, we'll assume it returns a dictionary with an "artist" key
    assert "artist" in response.json()


def test_get_artists_not_found():
    response = client.get("/artists?genre=nonexistent&country=nowhere&city=unknown")
    assert response.status_code == 404
    assert response.json() == {"detail": "Artist not found"}
