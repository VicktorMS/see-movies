from fastapi import Response, APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import crud, models, schemas
from app.core.db import get_db
from app.services.tmdb_service import TMDBService

router = APIRouter()

def get_tmdb_service():
    return TMDBService()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.FavoriteListResponse)
def create_favorite_list(
    favorite_list: schemas.FavoriteListCreate, 
    db: Session = Depends(get_db)
):
    """
    Create a new favorite list.
    """
    return crud.create_favorite_list(db, favorite_list_create=favorite_list)

@router.get("/", response_model=List[schemas.FavoriteListResponse])
def get_favorite_lists(
    skip: int = 0, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    """
    Get a list of all favorite lists.
    """
    return crud.get_favorite_lists(db, skip=skip, limit=limit)

@router.get("/{favorite_list_id}", response_model=schemas.FavoriteListResponse)
def get_favorite_list(
    favorite_list_id: int, 
    db: Session = Depends(get_db)
):
    """
    Get a favorite list by ID.
    """
    db_favorite_list = crud.get_favorite_list(db, favorite_list_id=favorite_list_id)
    if not db_favorite_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    return db_favorite_list

@router.put("/{favorite_list_id}", response_model=schemas.FavoriteListResponse)
def update_favorite_list(
    favorite_list_id: int, 
    favorite_list: schemas.FavoriteListCreate, 
    db: Session = Depends(get_db)
):
    """
    Update a favorite list by ID.
    """
    db_favorite_list = crud.update_favorite_list(db, favorite_list_id=favorite_list_id, favorite_list_update=favorite_list)
    if not db_favorite_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    return db_favorite_list

@router.delete("/{favorite_list_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_favorite_list(
    favorite_list_id: int, 
    db: Session = Depends(get_db)
):
    """
    Delete a favorite list by ID.
    """
    success = crud.delete_favorite_list(db, favorite_list_id=favorite_list_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.delete("/{favorite_list_id}/remove_movie/", status_code=status.HTTP_204_NO_CONTENT)
def remove_movie_from_favorite_list(
    favorite_list_id: int, 
    movie_id: int, 
    db: Session = Depends(get_db)
):
    """
    Remove a movie from a favorite list.
    """
    db_favorite_list, error = crud.remove_movie_from_favorite_list(db, favorite_list_id, movie_id)
    
    if error == "Favorite list not found":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list not found")
    elif error == "Movie not in favorite list":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not in favorite list")
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post("/{favorite_list_id}/add_movie/", response_model=schemas.FavoriteListResponse)
async def add_movie_to_favorite_list(
    favorite_list_id: int, 
    external_id: int, 
    db: Session = Depends(get_db),
    tmdb_service: TMDBService = Depends(get_tmdb_service)
):
    """
    Add a movie to a favorite list.
    If the movie is not in the database, it will be fetched from TMDB and added to the database.
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
