def test_create_favorite_list(client):
    response = client.post("/favorites/", json={"name": "My Favorite Movies", "description": "A list of my favorite movies"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "My Favorite Movies"
    assert "id" in data

def test_get_favorite_lists(client):
    client.post("/favorites/", json={"name": "My Favorite Movies", "description": "A list of my favorite movies"})
    
    response = client.get("/favorites/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_get_favorite_list(client):
    create_response = client.post("/favorites/", json={"name": "Sci-Fi Movies", "description": "A list of sci-fi movies"})
    favorite_list_id = create_response.json()["id"]

    response = client.get(f"/favorites/{favorite_list_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Sci-Fi Movies"
    assert data["id"] == favorite_list_id

def test_update_favorite_list(client):
    create_response = client.post("/favorites/", json={"name": "Sci-Fi Movies", "description": "A list of sci-fi movies"})
    favorite_list_id = create_response.json()["id"]

    update_response = client.put(f"/favorites/{favorite_list_id}", json={"name": "Updated Movies", "description": "An updated list of movies"})
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["name"] == "Updated Movies"
    assert data["description"] == "An updated list of movies"

def test_delete_favorite_list(client):
    create_response = client.post("/favorites/", json={"name": "Sci-Fi Movies", "description": "A list of sci-fi movies"})
    favorite_list_id = create_response.json()["id"]

    delete_response = client.delete(f"/favorites/{favorite_list_id}")
    assert delete_response.status_code == 200
    assert delete_response.json() == {"message": "Favorite list deleted successfully"}

    get_response = client.get(f"/favorites/{favorite_list_id}")
    assert get_response.status_code == 404
