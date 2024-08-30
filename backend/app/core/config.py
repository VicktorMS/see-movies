from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", 
        env_ignore_empty=True, 
        extra="ignore"
    )
    POSTGRES_SERVER: str
    POSTGRES_PORT: int  
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    TMDB_API_BASE_URL: str
    TMDB_API_KEY: str
    TMDB_API_READ_ACCESS_TOKEN: str

settings = Settings()
