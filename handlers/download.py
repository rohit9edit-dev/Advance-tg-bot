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
from datetime import datetime

router = Router()

@router.message(Command(commands=["download"]))
async def cmd_download(message: Message):
    """Handle /download command"""
    await message.answer("Please provide the secure link to download the file.")

@router.message(F.text.startswith("https://t.me/"))
async def handle_link_access(message: Message):
    """Handle link access"""
    text = message.text.strip()
    
    # Extract token from URL
    # Format: https://t.me/botname?start=token
    if "?start=" in text:
        token = text.split("?start=")[1]
    else:
        await message.answer("Invalid link format.")
        return
    
    # Validate link
    link = await LinkService.get_link_by_token(token)
    if not link:
        await message.answer("Invalid or expired link.")
        return
        
    if link.is_revoked:
        await message.answer("This link has been revoked.")
        return
        
    if link.expires_at and link.expires_at < datetime.utcnow():
        await message.answer("This link has expired.")
        return
        
    # Get file information
    file_record = await FileService.get_file_by_id(link.file_id)
    if not file_record:
        await message.answer("File not found.")
        return
        
    # Log access
    from database.models.access_log import AccessLog
    async with AsyncSessionLocal() as session:
        log_entry = AccessLog(
            link_token=token,
            user_id=link.owner_id,
            ip_address=message.from_user.id,
            user_agent="Telegram Bot"
        )
        session.add(log_entry)
        await session.commit()
    
    # In a real implementation, download from Telegram channel
    # For now, simulate with a placeholder
    await message.answer(f"Downloading file: {file_record.name}")
