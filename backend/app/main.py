from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.api import images, contact

app = FastAPI(
    title="奶蛙世界 API",
    description="奶蛙介绍网站后端API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(images.router, prefix="/api", tags=["images"])
app.include_router(contact.router, prefix="/api", tags=["contact"])

# Serve images from the images directory
images_dir = Path(__file__).parent.parent.parent / "images"
if images_dir.exists():
    app.mount("/images", StaticFiles(directory=str(images_dir)), name="images")


@app.get("/")
async def root():
    return {"message": "🐸 奶蛙世界 API", "docs": "/docs", "health": "/api/health"}


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "奶蛙世界 API 运行中 🐸"}
