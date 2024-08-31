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
    movie_data = await tmdb_service.search_movies(movie_title)
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

@router.get("/", status_code=status.HTTP_200_OK, summary="Get Movies", description="Get movies on TMDB based on popularity, release date, and other criteria.")
async def get_movies(
    page: int = Query(1, description="Page number of the results"),
    language: str = Query("en-US", description="Language of the movies"),
    sort_by: str = Query("popularity.desc", description="Sorting criteria for the movies"),
    include_adult: bool = Query(False, description="Whether to include adult movies"),
    tmdb_service: TMDBService = Depends(get_tmdb_service)
):
    """
    Get movies on TMDB.

    - **page**: The page number to retrieve (pagination).
    - **language**: The language of the movies (default is "en-US").
    - **sort_by**: The criteria to sort the movies (default is by popularity).
    - **include_adult**: Whether to include adult movies in the results.

    This endpoint allows you to discover movies based on various criteria using the TMDB API.
    """
    movie_data = await tmdb_service.get_movies(page=page, language=language, sort_by=sort_by, include_adult=include_adult)
    return movie_data