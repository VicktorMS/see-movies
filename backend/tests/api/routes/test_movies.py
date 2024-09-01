from fastapi import status

def test_search_movies_success(client, tmdb_service_mock):
    # Simula uma resposta bem-sucedida do serviço TMDB
    tmdb_service_mock.search_movies.return_value = [{"id": 1, "title": "Inception"}]
    
    response = client.get("/movies/search?movie_title=Inception")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert data[0]["title"] == "Inception"

def test_search_movies_not_found(client, tmdb_service_mock):
    # Simula um erro 404 do serviço TMDB
    tmdb_service_mock.search_movies.return_value = {"Error": "Movie not found"}
    
    response = client.get("/movies/search?movie_title=NonexistentMovie")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Movie not found"}

def test_get_movie_by_id_success(client, tmdb_service_mock):
    # Simula uma resposta bem-sucedida do serviço TMDB
    tmdb_service_mock.get_movie_by_id.return_value = {"id": 680, "title": "Pulp Fiction"}
    
    response = client.get("/movies/680")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["title"] == "Pulp Fiction"
    assert data["id"] == 680

def test_get_movie_by_id_not_found(client, tmdb_service_mock):
    # Simula um erro 404 do serviço TMDB
    tmdb_service_mock.get_movie_by_id.return_value = {"Error": "Movie not found"}
    
    response = client.get("/movies/99999999999")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Movie not found in TMDB"}


def test_get_movies_success(client):
    response = client.get("/movies")
    
    assert response.status_code == 200
    data = response.json()
    assert data["page"] == 1
    assert len(data["results"]) > 0
    assert data["total_pages"] > 0
    assert data["total_results"] > 0
    
def test_get_movies_with_query_params(client):
    response = client.get("/movies", params={"page": 2, "sort_by": "release_date.desc"})
    
    assert response.status_code == 200
    data = response.json()
    assert data["page"] == 2
    assert len(data["results"]) > 0
    assert data["total_pages"] > 0
    assert data["total_results"] > 0

def test_get_movies_not_found(client):
    response = client.get("/movies", params={"page": 500})  
    
    assert response.status_code == 200  
    data = response.json()
    assert data["page"] == 500
    assert len(data["results"]) >= 0  
    assert data["total_pages"] >= 0
    assert data["total_results"] >= 0
