import requests
from .core.config import settings


def get_movie_from_tmdb(movie_title: str):
    url = f"{settings.TMDB_API_BASE_URL}search/movie"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {settings.TMDB_API_READ_ACCESS_TOKEN}"
    }
    params = {
        "query": movie_title,
        "include_adult": False,
    }

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    data = response.json()
    if data["results"]:
        return data["results"]
    else:
        return {"Error": "Movie not found"}