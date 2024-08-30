# app/api/routes.py
from app.services.tmdb_service import TMDBService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import crud, models, schemas
from app.core.db import get_db


router = APIRouter()

def get_tmdb_service():
    return TMDBService()


@router.post("/", response_model=schemas.FavoriteListResponse)
def create_favorite_list(favorite_list: schemas.FavoriteListCreate, db: Session = Depends(get_db)):
    db_favorite_list = crud.create_favorite_list(db, favorite_list=favorite_list)
    return db_favorite_list


@router.get("/", response_model=List[schemas.FavoriteListResponse])
def get_favorite_lists(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_favorite_lists(db, skip=skip, limit=limit)


@router.get("/{favorite_list_id}", response_model=schemas.FavoriteListResponse)
def get_favorite_list(favorite_list_id: int, db: Session = Depends(get_db)):
    db_favorite_list = crud.get_favorite_list(db, favorite_list_id=favorite_list_id)
    if db_favorite_list is None:
        raise HTTPException(status_code=404, detail="Favorite list not found")
    return db_favorite_list


@router.put("/{favorite_list_id}", response_model=schemas.FavoriteListResponse)
def update_favorite_list(favorite_list_id: int, favorite_list: schemas.FavoriteListCreate, db: Session = Depends(get_db)):
    db_favorite_list = crud.update_favorite_list(db, favorite_list_id=favorite_list_id, favorite_list=favorite_list)
    if db_favorite_list is None:
        raise HTTPException(status_code=404, detail="Favorite list not found")
    return db_favorite_list


@router.delete("/{favorite_list_id}")
def delete_favorite_list(favorite_list_id: int, db: Session = Depends(get_db)):
    success = crud.delete_favorite_list(db, favorite_list_id=favorite_list_id)
    if not success:
        raise HTTPException(status_code=404, detail="Favorite list not found")
    return {"message": "Favorite list deleted successfully"}



@router.delete("/{favorite_list_id}/remove_movie/", response_model=schemas.FavoriteListResponse)
def remove_movie_from_favorite_list(favorite_list_id: int, movie_id: int, db: Session = Depends(get_db)):
    db_favorite_list, error = crud.remove_movie_from_favorite_list(db, favorite_list_id, movie_id)
    
    if error == "Favorite list not found":
        raise HTTPException(status_code=404, detail="Favorite list not found")
    elif error == "Movie not in favorite list":
        raise HTTPException(status_code=400, detail="Movie not in favorite list")
    
    return db_favorite_list


@router.post("/{favorite_list_id}/add_movie/", response_model=schemas.FavoriteListResponse)
async def add_movie_to_favorite_list(
    favorite_list_id: int, 
    external_id: int, 
    db: Session = Depends(get_db),
    tmdb_service: TMDBService = Depends(get_tmdb_service)
):
    movie = db.query(models.Movie).filter(models.Movie.external_id == str(external_id)).first()
    # Se o filme não estiver no banco de dados, busca na API TMDB e o cria
    if not movie:
        movie_data = await tmdb_service.get_movie_by_id(external_id)
        if "Error" in movie_data:
            raise HTTPException(status_code=404, detail="Movie not found in TMDB")
        movie = crud.create_movie_from_api_data(db, movie_data)
    
    # Verifica se a lista de favoritos existe
    db_favorite_list = db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()
    if not db_favorite_list:
        raise HTTPException(status_code=404, detail="Favorite list not found")
    
    # Verifica se o filme já está na lista de favoritos
    if movie in db_favorite_list.movies:
        raise HTTPException(status_code=400, detail="Movie already in favorite list")
    
    # Adiciona o filme à lista de favoritos
    db_favorite_list.movies.append(movie)
    db.commit()
    db.refresh(db_favorite_list)
    
    return db_favorite_list