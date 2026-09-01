from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter()


class ContactForm(BaseModel):
    name: str
    email: str
    subject: str
    message: str


@router.post("/contact")
async def submit_contact(form: ContactForm):
    # In a real application, you would send an email or save to database
    print(f"收到留言: {form.name} <{form.email}> - {form.subject}")
    print(f"内容: {form.message}")

    return {
        "success": True,
        "message": "留言发送成功，感谢你的反馈！"
    }
