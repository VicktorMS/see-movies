from pydantic import BaseModel
from typing import List


class MovieBase(BaseModel):
    external_id: str
    title: str
    
class MovieCreate(MovieBase):
    pass

class MovieResponse(MovieBase):
    id: int
    
    class Config:
        from_attributes = True
        
class FavoriteListBase(BaseModel):
    name: str
    
class FavoriteListCreate(FavoriteListBase):
    movies: List[int]
    
class FavoriteListResponse(FavoriteListBase):
    id: int
    movies: List[MovieResponse]
    
    class Config:
        from_attributes = True
    
    