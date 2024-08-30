from pydantic import BaseModel, ConfigDict
from typing import List

class MovieBase(BaseModel):
    external_id: int
    title: str
    poster_path: str
    backdrop_path: str
    vote_average: float
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "external_id": 550,
                "title": "Fight Club",
                "poster_path": "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
                "backdrop_path": "/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
                "vote_average": 8.4
            }
        }
    )

class MovieCreate(MovieBase):
    """
    Schema for creating a new movie.

    Inherits fields from `MovieBase` and requires no additional fields.
    """

class MovieResponse(MovieBase):
    id: int
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "external_id": 550,
                "title": "Fight Club",
                "poster_path": "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
                "backdrop_path": "/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
                "vote_average": 8.4
            }
        }
    )

class FavoriteListBase(BaseModel):
    name: str
    description: str
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "My Favorite Movies",
                "description": "A list of my all-time favorite movies."
            }
        }
    )

class FavoriteListCreate(FavoriteListBase):
    """
    Schema for creating a new favorite list.

    Inherits fields from `FavoriteListBase` and requires no additional fields.
    """

class FavoriteListResponse(FavoriteListBase):
    id: int
    movies: List[MovieResponse]
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "name": "My Favorite Movies",
                "description": "A list of my all-time favorite movies.",
                "movies": [
                    {
                        "id": 1,
                        "external_id": 550,
                        "title": "Fight Club",
                        "poster_path": "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
                        "backdrop_path": "/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
                        "vote_average": 8.4
                    }
                ]
            }
        }
    )
