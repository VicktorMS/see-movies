import httpx
from fastapi import HTTPException, status
from ..core.config import settings

class TMDBService:
    def __init__(self):
        self.api_base_url = settings.TMDB_API_BASE_URL
        self.headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {settings.TMDB_API_BEARER_TOKEN}"
        }

    async def get_movies(self, movie_title: str):
        url = f"{self.api_base_url}/search/movie"
        params = {
            "query": movie_title,
            "language": "en-US",
            "include_adult": "false",
            "page": 1
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=self.headers, params=params)
                response.raise_for_status() 
                data = response.json()
                
            if data["results"]:
                return data["results"]
            else:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not found")
        
        except httpx.HTTPStatusError as e:
            if e.response.status_code == status.HTTP_404_NOT_FOUND:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not found in TMDB")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while searching for the movie on TMDB")
            
    async def get_movie_by_id(self, movie_id: int):
        url = f"{self.api_base_url}/movie/{movie_id}"
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=self.headers)
                response.raise_for_status() 
                return response.json()
            
        except httpx.HTTPStatusError as e:
            if e.response.status_code == status.HTTP_404_NOT_FOUND:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not found in TMDB")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while fetching the movie from TMDB")
