from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import Command
from services.link_service import LinkService
from services.file_service import FileService
from services.user_service import UserService
from database.models.link import Link
from database.models.file import File
from sqlalchemy import select
from database.connection import AsyncSessionLocal

router = Router()

@router.message(Command(commands=["links"]))
async def cmd_links(message: Message):
    """List user's links"""
    user = await UserService.get_or_create_user(
        str(message.from_user.id),
        message.from_user.username
    )
    
    # Get user's files
    files = await FileService.get_files_by_owner(user.id)
    
    if not files:
        await message.answer("You haven't uploaded any files yet.")
        return
    
    response_text = "Your uploaded files:\n\n"
    for file in files:
        # Get links for this file
        async with AsyncSessionLocal() as session:
            stmt = select(Link).where(Link.file_id == file.id)
            result = await session.execute(stmt)
            links = result.scalars().all()
            
        response_text += f"📄 {file.name}\n"
        for link in links:
            response_text += f"🔗 https://t.me/{settings.bot_name}?start={link.token}\n"
        response_text += "\n"
    
    await message.answer(response_text)
