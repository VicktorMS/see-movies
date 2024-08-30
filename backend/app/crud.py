from sqlalchemy.orm import Session
from typing import List
from . import models, schemas


def create_favorite_list(db: Session, favorite_list: schemas.FavoriteListCreate):
    db_favorite_list = models.FavoriteList(name=favorite_list.name)
    for movie in favorite_list.movies:
        movie = db.query(models.Movie).filter(models.Movie.id == movie).first()
        if movie:
            db_favorite_list.movies.append(movie)
    db.add(db_favorite_list)
    db.commit()
    db.refresh(db_favorite_list)
    return db_favorite_list


def get_favorite_lists(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.FavoriteList).offset(skip).limit(limit).all()


def get_favorite_list(db: Session, favorite_list_id: int):
    return db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()


def update_favorite_list(db: Session, favorite_list_id: int, favorite_list: models.FavoriteList):
    db_favorite_list = db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()
    if db_favorite_list is None:
        return None
    
    db_favorite_list.name = favorite_list.name
    
    db_favorite_list.movies = []
    for movie in favorite_list.movies:
        movie = db.query(models.Movie).filter(models.Movie.id == movie).first()
        if movie:
            db_favorite_list.movies.append(movie)
    
    db.commit()
    db.refresh(db_favorite_list)
    return db_favorite_list


def delete_favorite_list(db: Session, favorite_list_id: int):
    db_favorite_list = db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()
    if db_favorite_list is None:
        return False
    db.delete(db_favorite_list)
    db.commit()
    return True


def add_movie_to_favorite_list(db: Session, favorite_list_id: int, movie_id: int):
    movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not movie:
        return None, "Movie not found"

    db_favorite_list = db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()
    if db_favorite_list is None:
        return None, "Favorite list not found"
    
    if movie in db_favorite_list.movies:
        return None, "Movie already in favorite list"
    
    db_favorite_list.movies.append(movie)
    db.commit()
    db.refresh(db_favorite_list)
    
    return db_favorite_list, None


