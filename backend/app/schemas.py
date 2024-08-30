from pydantic import BaseModel, ConfigDict
from typing import List


class MovieBase(BaseModel):
    external_id: int
    title: str
    poster_path: str
    backdrop_path: str
    vote_average: float
    
class MovieCreate(MovieBase):
    pass

class MovieResponse(MovieBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True)
        
        
class FavoriteListBase(BaseModel):
    name: str
    description: str
    
class FavoriteListCreate(FavoriteListBase):
    pass
    
class FavoriteListResponse(FavoriteListBase):
    id: int
    movies: List[MovieResponse]
    
    model_config = ConfigDict(from_attributes=True)
    
    