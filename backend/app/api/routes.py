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