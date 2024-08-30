from fastapi import APIRouter, HTTPException, Query, Depends
from app.services.tmdb_service import TMDBService

router = APIRouter()

def get_tmdb_service():
    return TMDBService()


@router.get("/")
async def get_movie(movie_title: str = Query(..., description="Title of the movie to search for"), tmdb_service: TMDBService = Depends(get_tmdb_service)):
    movie_data = await tmdb_service.get_movies(movie_title)
    if "Error" in movie_data:
        raise HTTPException(status_code=404, detail=movie_data["Error"])
    return movie_data