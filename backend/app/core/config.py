import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"),
        env_ignore_empty=True, 
        extra="ignore"
    )
    
    PROJECT_NAME: str
    PROJECT_VERSION: str
    POSTGRES_SERVER: str
    POSTGRES_PORT: int  
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    TMDB_API_BASE_URL: str
    TMDB_API_KEY: str
    TMDB_API_BEARER_TOKEN: str
    BACKEND_CORS_ORIGINS: str = "*"

settings = Settings()
