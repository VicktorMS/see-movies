from fastapi import FastAPI
from .core.db import engine
from .core.config import settings
from . import models
from app.api.routes import favorites, movies
from fastapi.middleware.cors import CORSMiddleware

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

allow_origins = settings.BACKEND_CORS_ORIGINS.split(",") if settings.BACKEND_CORS_ORIGINS else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,  
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(favorites.router, prefix='/favorites', tags=['favorites'])
app.include_router(movies.router, prefix='/movies', tags=['movies'])

@app.get("/")
async def root():
    return {
        "message": "Bem-vindo do projeto See Movie! 🚀 Para explorar e interagir com os endpoints disponíveis, visite a documentação interativa.",
        "documentation": {
            "swagger_ui": "/docs",
            "redoc": "/redoc"
        }
    }
    