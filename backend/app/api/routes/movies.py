from fastapi import APIRouter, HTTPException, Query, Depends
from app.services.tmdb_service import TMDBService

router = APIRouter()

def get_tmdb_service():
    return TMDBService()


@router.get("/search")
async def search_movies(movie_title: str = Query(..., description="Title of the movie to search for"), tmdb_service: TMDBService = Depends(get_tmdb_service)):
    """
    Search for movies on TMDB.
    """
    movie_data = await tmdb_service.get_movies(movie_title)
    if "Error" in movie_data:
        raise HTTPException(status_code=404, detail=movie_data["Error"])
    return movie_data

@router.get("/{movie_id}")
async def get_movie_by_id(movie_id: int, tmdb_service: TMDBService = Depends(get_tmdb_service)):
    """
    Get a movie by ID from TMDB.
    """
    movie_data = await tmdb_service.get_movie(movie_id)
    if "Error" in movie_data:
        raise HTTPException(status_code=404, detail=movie_data["Error"])
    return movie_data
