from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import Command
from services.user_service import UserService

router = Router()

@router.message(Command(commands=["start"]))
async def cmd_start(message: Message):
    """Handle /start command"""
    user = await UserService.get_or_create_user(
        str(message.from_user.id),
        message.from_user.username
    )
    
    welcome_text = (
        "Welcome to the File Storage Bot!\n\n"
        "You can upload files and generate secure links to share them.\n"
        "To get started, use the /upload command."
    )
    
    await message.answer(welcome_text)
