from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import Command
from services.user_service import UserService
from database.models.user import UserRole

router = Router()

@router.message(Command(commands=["profile"]))
async def cmd_profile(message: Message):
    """Show user profile"""
    user = await UserService.get_or_create_user(
        str(message.from_user.id),
        message.from_user.username
    )
    
    role_text = {
        UserRole.USER: "Regular User",
        UserRole.ADMIN: "Administrator",
        UserRole.SUPER_ADMIN: "Super Administrator"
    }
    
    profile_text = (
        f"👤 Profile Information\n\n"
        f"ID: {user.id}\n"
        f"Username: @{user.username}\n"
        f"Role: {role_text[user.role]}\n"
        f"Joined Channels: {user.joined_channels or 'None'}\n"
        f"Registered Since: {user.created_at.strftime('%Y-%m-%d %H:%M:%S')}"
    )
    
    await message.answer(profile_text)
