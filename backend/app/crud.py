from sqlalchemy.orm import Session
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


