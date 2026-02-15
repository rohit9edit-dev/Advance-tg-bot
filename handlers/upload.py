from aiogram import Router, F
from aiogram.types import Message, FSInputFile
from aiogram.filters import Command
from storage.channel_manager import ChannelManager
from services.file_service import FileService
from services.user_service import UserService
import tempfile
import os

router = Router()

@router.message(Command(commands=["upload"]))
async def cmd_upload(message: Message):
    """Handle /upload command"""
    await message.answer("Please send me a file to upload.")

@router.message(F.document)
async def handle_document(message: Message):
    """Handle document uploads"""
    user = await UserService.get_or_create_user(
        str(message.from_user.id),
        message.from_user.username
    )
    
    # Get file information
    file_info = await message.bot.get_file(message.document.file_id)
    file_path = file_info.file_path
    
    # Download file temporarily
    file_content = await message.bot.download_file(file_path)
    
    # Save to temporary location
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(message.document.file_name)[1]) as tmp_file:
        tmp_file.write(file_content.read())
        temp_file_path = tmp_file.name
    
    try:
        # Upload to channel
        channel_manager = ChannelManager()
        channel_id = await channel_manager.get_next_channel()
        
        # In a real implementation, upload file to Telegram channel
        # For now, we simulate this
        file_data = await channel_manager.upload_file_to_channel(
            temp_file_path,
            channel_id,
            f"Uploaded by {message.from_user.username}"
        )
        
        # Create file record in database
        file_record = await FileService.create_file_record(
            name=message.document.file_name,
            file_id=file_data["file_id"],
            file_size=message.document.file_size,
            mime_type=message.document.mime_type,
            owner_id=user.id,
            channel_id=file_data["channel_id"],
            path=file_data["path"]
        )
        
        # Create secure link
        from services.link_service import LinkService
        link = await LinkService.create_link(file_record.id, user.id, expires_in_hours=24)
        
        response_text = (
            f"✅ File uploaded successfully!\n\n"
            f"📁 Name: {message.document.file_name}\n"
            f"💾 Size: {message.document.file_size} bytes\n"
            f"🔗 Secure Link: https://t.me/{settings.bot_name}?start={link.token}"
        )
        
        await message.answer(response_text)
        
    finally:
        # Clean up temporary file
        if os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
