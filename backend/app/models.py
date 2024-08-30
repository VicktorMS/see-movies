from sqlalchemy import Column, Integer, String, ForeignKey, Table, Float
from sqlalchemy.orm import relationship
from .core.db import Base

favorite_movies = Table(
    'favorite_movies',
    Base.metadata,
    Column('favorite_list_id', Integer, ForeignKey('favorite_lists.id')),
    Column('movie_id', Integer, ForeignKey('movies.id'))
)

class Movie(Base):
    __tablename__ = "movies"
    
    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, unique=True, index=True)
    title = Column(String, index=True)
    poster_path = Column(String)
    backdrop_path = Column(String)
    vote_average = Column(Float)
    
    # Relacionamento inverso com listas de favoritos
    favorite_lists = relationship(
        "FavoriteList",
        secondary=favorite_movies,
        back_populates="movies"
    )

class FavoriteList(Base):
    __tablename__ = "favorite_lists"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    
    # Relacionamento com filmes
    movies = relationship(
        "Movie",
        secondary=favorite_movies,
        back_populates="favorite_lists"
    )