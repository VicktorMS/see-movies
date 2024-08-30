from fastapi import Response, APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import crud, models, schemas
from app.core.db import get_db
from app.services.tmdb_service import TMDBService

router = APIRouter()

def get_tmdb_service():
    return TMDBService()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.FavoriteListResponse, summary="Create a Favorite List", description="Creates a new favorite list. The list can initially be empty or contain movies.")
def create_favorite_list(
    favorite_list: schemas.FavoriteListCreate, 
    db: Session = Depends(get_db)
):
    """
    Create a new favorite list.

    - **name**: The name of the favorite list.
    - **description**: A brief description of the list.
    - **movies**: A list of movie IDs to add to the list (optional).
    """
    return crud.create_favorite_list(db, favorite_list_create=favorite_list)

@router.get("/", response_model=List[schemas.FavoriteListResponse], summary="Get All Favorite Lists", description="Retrieves all favorite lists with optional pagination.")
def get_favorite_lists(
    skip: int = 0, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    """
    Get a list of all favorite lists with pagination.

    - **skip**: The number of records to skip for pagination.
    - **limit**: The maximum number of records to return.
    """
    return crud.get_favorite_lists(db, skip=skip, limit=limit)

@router.get("/{favorite_list_id}", response_model=schemas.FavoriteListResponse, summary="Get a Favorite List by ID", description="Retrieves the details of a specific favorite list by its ID.")
def get_favorite_list(
    favorite_list_id: int, 
    db: Session = Depends(get_db)
):
    """
    Get a favorite list by ID.

    - **favorite_list_id**: The ID of the favorite list to retrieve.
    """
    db_favorite_list = crud.get_favorite_list(db, favorite_list_id=favorite_list_id)
    if not db_favorite_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    return db_favorite_list

@router.put("/{favorite_list_id}", response_model=schemas.FavoriteListResponse, summary="Update a Favorite List", description="Updates the details of an existing favorite list by its ID.")
def update_favorite_list(
    favorite_list_id: int, 
    favorite_list: schemas.FavoriteListCreate, 
    db: Session = Depends(get_db)
):
    """
    Update a favorite list by ID.

    - **favorite_list_id**: The ID of the favorite list to update.
    - **name**: The new name of the favorite list.
    - **description**: The new description of the favorite list.
    - **movies**: An updated list of movie IDs for the favorite list.
    """
    db_favorite_list = crud.update_favorite_list(db, favorite_list_id=favorite_list_id, favorite_list_update=favorite_list)
    if not db_favorite_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    return db_favorite_list

@router.delete("/{favorite_list_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a Favorite List", description="Deletes a favorite list by its ID.")
def delete_favorite_list(
    favorite_list_id: int, 
    db: Session = Depends(get_db)
):
    """
    Delete a favorite list by ID.

    - **favorite_list_id**: The ID of the favorite list to delete.
    """
    success = crud.delete_favorite_list(db, favorite_list_id=favorite_list_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.delete("/{favorite_list_id}/remove_movie/", status_code=status.HTTP_204_NO_CONTENT, summary="Remove a Movie from a Favorite List", description="Removes a movie from a favorite list by the list ID and movie ID.")
def remove_movie_from_favorite_list(
    favorite_list_id: int, 
    movie_id: int, 
    db: Session = Depends(get_db)
):
    """
    Remove a movie from a favorite list.

    - **favorite_list_id**: The ID of the favorite list.
    - **movie_id**: The ID of the movie to remove.
    """
    db_favorite_list, error = crud.remove_movie_from_favorite_list(db, favorite_list_id, movie_id)
    
    if error == "Favorite list not found":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    elif error == "Movie not in favorite list":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not in favorite list")
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post("/{favorite_list_id}/add_movie/", response_model=schemas.FavoriteListResponse, summary="Add a Movie to a Favorite List", description="Adds a movie to a favorite list. If the movie does not exist in the database, it will be fetched from TMDB and added.")
async def add_movie_to_favorite_list(
    favorite_list_id: int, 
    external_id: int, 
    db: Session = Depends(get_db),
    tmdb_service: TMDBService = Depends(get_tmdb_service)
):
    """
    Add a movie to a favorite list.

    - **favorite_list_id**: The ID of the favorite list.
    - **external_id**: The external ID of the movie to add (from TMDB).
    
    If the movie is not found in the local database, it will be fetched from TMDB and added automatically.
    """
    movie = db.query(models.Movie).filter(models.Movie.external_id == str(external_id)).first()
    if not movie:
        movie_data = await tmdb_service.get_movie_by_id(external_id)
        if "Error" in movie_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not found in TMDB")
        movie = crud.create_movie_from_api_data(db, movie_data)
    
    db_favorite_list = db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()
    if not db_favorite_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    
    if movie in db_favorite_list.movies:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Movie already in favorite list")
    
    db_favorite_list.movies.append(movie)
    db.commit()
    db.refresh(db_favorite_list)
    
    return db_favorite_list
