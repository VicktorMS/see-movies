import httpx
from ..core.config import settings


class TMDBService:
    def __init__(self):
        self.api_base_url = settings.TMDB_API_BASE_URL
        self.headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {settings.TMDB_API_READ_ACCESS_TOKEN}"
        }

    async def get_movies(self, movie_title: str):
            url = f"{self.api_base_url}/search/movie"
            params = {
                "query": movie_title,
                "language": "en-US",
                "include_adult": "false",
                "page": 1
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=self.headers, params=params)
                response.raise_for_status()  # Levanta uma exceção se a resposta não for 200 (OK)
                data = response.json()
            
            if data["results"]:
                return data["results"]
            else:
                return {"Error": "Movie not found"}