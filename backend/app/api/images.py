from fastapi import APIRouter, HTTPException
from pathlib import Path
from typing import List

router = APIRouter()

IMAGES_DIR = Path(__file__).parent.parent.parent.parent / "images"

ANIMATION_KEYWORDS = [
    'idle', 'waiting', 'waving', 'jumping', 'running', 'failed', 'review'
]


def get_image_category(filename: str) -> str:
    lower = filename.lower()
    for keyword in ANIMATION_KEYWORDS:
        if keyword in lower:
            return 'animation'
    if lower.endswith(('.gif', '.webp')):
        return 'emoji'
    return 'sticker'


def scan_images() -> List[dict]:
    if not IMAGES_DIR.exists():
        return []

    valid_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.webp'}
    images = []

    for file_path in IMAGES_DIR.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in valid_extensions:
            images.append({
                'filename': file_path.name,
                'category': get_image_category(file_path.name),
                'extension': file_path.suffix.lower()
            })

    images.sort(key=lambda x: x['filename'])
    return images


@router.get("/images")
async def get_images():
    images = scan_images()
    return {
        "images": images,
        "total": len(images)
    }


@router.get("/images/{filename}")
async def get_image(filename: str):
    file_path = IMAGES_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="图片不存在")
    return {
        "filename": file_path.name,
        "category": get_image_category(file_path.name),
        "url": f"/images/{filename}"
    }
