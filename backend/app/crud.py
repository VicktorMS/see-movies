from sqlalchemy.orm import Session
from typing import List, Optional, Tuple
from . import models, schemas


def create_favorite_list(db: Session, favorite_list_create: schemas.FavoriteListCreate) -> models.FavoriteList:
    """Create a new favorite list."""
    db_favorite_list = models.FavoriteList(name=favorite_list_create.name, description=favorite_list_create.description)
    db.add(db_favorite_list)
    db.commit()
    db.refresh(db_favorite_list)
    return db_favorite_list


def get_favorite_lists(db: Session, skip: int = 0, limit: int = 10) -> List[models.FavoriteList]:
    """Get a list of favorite lists."""
    return db.query(models.FavoriteList).offset(skip).limit(limit).all()


def get_favorite_list(db: Session, favorite_list_id: int) -> Optional[models.FavoriteList]:
    """Get a favorite list by ID."""
    return db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()


def update_favorite_list(
    db: Session, favorite_list_id: int, favorite_list_update: schemas.FavoriteListCreate
) -> Optional[models.FavoriteList]:
    """Update a favorite list."""
    db_favorite_list = db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()
    if db_favorite_list is None:
        return None
    db_favorite_list.name = favorite_list_update.name
    db_favorite_list.description = favorite_list_update.description
    db.commit()
    db.refresh(db_favorite_list)
    return db_favorite_list


def delete_favorite_list(db: Session, favorite_list_id: int) -> bool:
    """Delete a favorite list."""
    db_favorite_list = db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()
    if db_favorite_list is None:
        return False
    db.delete(db_favorite_list)
    db.commit()
    return True


def add_movie_to_favorite_list(
    db: Session, favorite_list_id: int, movie_id: int
) -> Tuple[Optional[models.FavoriteList], Optional[str]]:
    """Add a movie to a favorite list."""
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


def remove_movie_from_favorite_list(
    db: Session, favorite_list_id: int, movie_id: int
) -> Tuple[Optional[models.FavoriteList], Optional[str]]:
    """Remove a movie from a favorite list."""
    db_favorite_list = db.query(models.FavoriteList).filter(models.FavoriteList.id == favorite_list_id).first()
    if db_favorite_list is None:
        return None, "Favorite list not found"
    
    movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if movie not in db_favorite_list.movies:
        return None, "Movie not in favorite list"
    
    db_favorite_list.movies.remove(movie)
    db.commit()
    db.refresh(db_favorite_list)
    
    return db_favorite_list, None


def create_movie_from_api_data(db: Session, movie_data: dict) -> models.Movie:
    """Create a new movie from API data."""
    movie_create = schemas.MovieCreate(
        external_id=movie_data["id"],
        title=movie_data["title"],
        poster_path=movie_data.get("poster_path", ""),
        backdrop_path=movie_data.get("backdrop_path", ""),
        vote_average=movie_data.get("vote_average", 0.0)
    )
    
    movie = models.Movie(**movie_create.dict())
    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie

