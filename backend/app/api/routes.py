# app/api/routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..db import get_db


router = APIRouter()

@router.post("/favorites/", response_model=schemas.FavoriteListResponse)
def create_favorite_list(favorite_list: schemas.FavoriteListCreate, db: Session = Depends(get_db)):
    db_favorite_list = crud.create_favorite_list(db, favorite_list)
    return db_favorite_list


@router.get("/favorites/", response_model=List[schemas.FavoriteListResponse])
def get_favorite_lists(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_favorite_lists(db, skip=skip, limit=limit)


@router.get("/favorites/{favorite_list_id}", response_model=schemas.FavoriteListResponse)
def get_favorite_list(favorite_list_id: int, db: Session = Depends(get_db)):
    db_favorite_list = crud.get_favorite_list(db, favorite_list_id=favorite_list_id)
    if db_favorite_list is None:
        raise HTTPException(status_code=404, detail="Favorite list not found")
    return db_favorite_list


@router.put("/favorites/{favorite_list_id}", response_model=schemas.FavoriteListResponse)
def update_favorite_list(favorite_list_id: int, favorite_list: schemas.FavoriteListCreate, db: Session = Depends(get_db)):
    db_favorite_list = crud.update_favorite_list(db, favorite_list_id=favorite_list_id, favorite_list=favorite_list)
    if db_favorite_list is None:
        raise HTTPException(status_code=404, detail="Favorite list not found")
    return db_favorite_list


@router.delete("/favorites/{favorite_list_id}")
def delete_favorite_list(favorite_list_id: int, db: Session = Depends(get_db)):
    success = crud.delete_favorite_list(db, favorite_list_id=favorite_list_id)
    if not success:
        raise HTTPException(status_code=404, detail="Favorite list not found")
    return {"message": "Favorite list deleted successfully"}