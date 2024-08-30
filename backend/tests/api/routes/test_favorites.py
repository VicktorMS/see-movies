from fastapi import status
from sqlalchemy.orm import sessionmaker, Session
from app.models import Movie, FavoriteList


def test_create_favorite_list(client):
    response = client.post("/favorites/", json={"name": "My Favorite Movies", "description": "A list of my favorite movies"})
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["name"] == "My Favorite Movies"
    assert "id" in data

    conflict_response = client.post("/favorites/", json={"name": "My Favorite Movies", "description": "A list of my favorite movies"})
    assert conflict_response.status_code == status.HTTP_201_CREATED

def test_get_favorite_lists(client):
    client.post("/favorites/", json={"name": "My Favorite Movies", "description": "A list of my favorite movies"})
    
    response = client.get("/favorites/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_get_favorite_list(client):
    create_response = client.post("/favorites/", json={"name": "Sci-Fi Movies", "description": "A list of sci-fi movies"})
    favorite_list_id = create_response.json()["id"]

    response = client.get(f"/favorites/{favorite_list_id}")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["name"] == "Sci-Fi Movies"
    assert data["id"] == favorite_list_id

    not_found_response = client.get(f"/favorites/{favorite_list_id + 1}")
    assert not_found_response.status_code == status.HTTP_404_NOT_FOUND

def test_update_favorite_list(client):
    create_response = client.post("/favorites/", json={"name": "Sci-Fi Movies", "description": "A list of sci-fi movies"})
    favorite_list_id = create_response.json()["id"]

    update_response = client.put(f"/favorites/{favorite_list_id}", json={"name": "Updated Movies", "description": "An updated list of movies"})
    assert update_response.status_code == status.HTTP_200_OK
    data = update_response.json()
    assert data["name"] == "Updated Movies"
    assert data["description"] == "An updated list of movies"

    not_found_response = client.put(f"/favorites/{favorite_list_id + 1}", json={"name": "Nonexistent", "description": "This list does not exist"})
    assert not_found_response.status_code == status.HTTP_404_NOT_FOUND

def test_delete_favorite_list(client):
    create_response = client.post("/favorites/", json={"name": "Sci-Fi Movies", "description": "A list of sci-fi movies"})
    favorite_list_id = create_response.json()["id"]

    delete_response = client.delete(f"/favorites/{favorite_list_id}")
    assert delete_response.status_code == status.HTTP_204_NO_CONTENT

    not_found_response = client.delete(f"/favorites/{favorite_list_id + 1}")
    assert not_found_response.status_code == status.HTTP_404_NOT_FOUND

    get_response = client.get(f"/favorites/{favorite_list_id}")
    assert get_response.status_code == status.HTTP_404_NOT_FOUND

def test_add_movie_existing_in_db(client, db_session: Session, tmdb_service_mock):
    # Create a favorite list
    favorite_list = FavoriteList(name="My Favorite Movies", description="Test description")
    db_session.add(favorite_list)
    db_session.commit()

    # Create a movie
    movie = Movie(external_id=680, title="Pulp Fiction", poster_path="path", backdrop_path="path", vote_average=8.4)
    db_session.add(movie)
    db_session.commit()

    # Add the movie to the favorite list
    response = client.post(f"/favorites/{favorite_list.id}/add_movie/?external_id=680")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data["movies"]) == 1
    assert data["movies"][0]["title"] == "Pulp Fiction"
    
    #Test adding a movie that does not exist in the database but is fetched from TMDB
def test_add_movie_fetched_from_tmdb(client, db_session: Session, tmdb_service_mock):
    # Create a favorite list
    favorite_list = FavoriteList(name="My Favorite Movies", description="Test description")
    db_session.add(favorite_list)
    db_session.commit()

    # Mock the TMDB service to return a movie
    tmdb_service_mock.get_movie_by_id.return_value = {
        "id": 680,
        "title": "Pulp Fiction",
        "poster_path": "path",
        "backdrop_path": "path",
        "vote_average": 8.4
    }

    # Add the movie to the favorite list
    response = client.post(f"/favorites/{favorite_list.id}/add_movie/?external_id=680")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data["movies"]) == 1
    assert data["movies"][0]["title"] == "Pulp Fiction"

# # Test trying to add a movie that already exists in the favorite list
def test_add_movie_already_in_favorite_list(client, db_session: Session, tmdb_service_mock):
    # Create a favorite list and a movie
    favorite_list = FavoriteList(name="My Favorite Movies", description="Test description")
    movie = Movie(external_id=680, title="Pulp Fiction", poster_path="path", backdrop_path="path", vote_average=8.4)
    favorite_list.movies.append(movie)
    db_session.add(favorite_list)
    db_session.commit()

    # Try to add the same movie to the favorite list again
    response = client.post(f"/favorites/{favorite_list.id}/add_movie/?external_id=680")

    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json() == {"detail": "Movie already in favorite list"}

# Test trying to add a movie to a non-existent favorite list
def test_add_movie_to_non_existent_favorite_list(client, db_session: Session, tmdb_service_mock):
    # Try to add a movie to a favorite list that doesn't exist
    response = client.post("/favorites/999/add_movie/?external_id=680")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Favorite list not found"}