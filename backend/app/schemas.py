from pydantic import BaseModel
from typing import List


class MovieBase(BaseModel):
    external_id: str
    title: str
    poster_path: str
    backdrop_path: str
    vote_average: float
    
class MovieCreate(MovieBase):
    pass

class MovieResponse(MovieBase):
    id: int
    
    class Config:
        from_attributes = True
        
        
class FavoriteListBase(BaseModel):
    name: str
    description: str
    
class FavoriteListCreate(FavoriteListBase):
    pass
    
class FavoriteListResponse(FavoriteListBase):
    id: int
    movies: List[MovieResponse]
    
    class Config:
        from_attributes = True
    
    