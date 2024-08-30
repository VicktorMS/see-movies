from fastapi import APIRouter, HTTPException, Query
from app.external_api import get_movie_from_tmdb

router = APIRouter()

@router.get("/")
def get_movie(movie_title: str = Query(..., description="Title of the movie to search for")):
    movie_data = get_movie_from_tmdb(movie_title)
    if "Error" in movie_data:
        raise HTTPException(status_code=404, detail=movie_data["Error"])
    return movie_data