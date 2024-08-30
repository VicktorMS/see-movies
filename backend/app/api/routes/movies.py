from fastapi import APIRouter, HTTPException, Query, Depends, status
from app.services.tmdb_service import TMDBService

router = APIRouter()

def get_tmdb_service():
    return TMDBService()

@router.get("/search", status_code=status.HTTP_200_OK, summary="Search Movies by Title", description="Search for movies on TMDB using a specific title.")
async def search_movies(
    movie_title: str = Query(..., description="Title of the movie to search for"), 
    tmdb_service: TMDBService = Depends(get_tmdb_service)
):
    """
    Search for movies on TMDB by title.

    - **movie_title**: The title of the movie you want to search for.

    This endpoint allows you to search for movies based on a partial or full title. The results are fetched from TMDB.
    """
    movie_data = await tmdb_service.get_movies(movie_title)
    if "Error" in movie_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=movie_data["Error"])
    return movie_data

@router.get("/{movie_id}", status_code=status.HTTP_200_OK, summary="Get Movie by ID", description="Retrieve a movie's details from TMDB by its ID.")
async def get_movie_by_id(
    movie_id: int, 
    tmdb_service: TMDBService = Depends(get_tmdb_service)
):
    """
    Get a movie's details by its ID from TMDB.

    - **movie_id**: The ID of the movie you want to retrieve.

    This endpoint retrieves detailed information about a specific movie from TMDB using its unique ID.
    """
    movie_data = await tmdb_service.get_movie_by_id(movie_id)
    if "Error" in movie_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=movie_data["Error"])
    return movie_data
