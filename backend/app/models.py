from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from .core.db import Base

favorite_list_movies = Table(
    'favorite_list_movies', Base.metadata,
    Column('favorite_list_id', Integer, ForeignKey('favorite_lists.id', ondelete="CASCADE"), primary_key=True),
    Column('movie_id', Integer, ForeignKey('movies.id'), primary_key=True)
)

class FavoriteList(Base):
    __tablename__ = 'favorite_lists'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    movies = relationship(
        "Movie",
        secondary=favorite_list_movies,
        back_populates="favorite_lists"
    )

class Movie(Base):
    __tablename__ = 'movies'

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, nullable=False, unique=True)
    title = Column(String, nullable=True)
    favorite_lists = relationship(
        "FavoriteList",
        secondary=favorite_list_movies,
        back_populates="movies"
    )
