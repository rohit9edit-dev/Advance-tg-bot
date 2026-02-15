from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import Command
from services.user_service import UserService
from database.models.user import UserRole

router = Router()

@router.message(Command(commands=["admin"]))
async def cmd_admin(message: Message):
    """Admin panel access"""
    user = await UserService.get_or_create_user(
        str(message.from_user.id),
        message.from_user.username
    )
    
    if user.role != UserRole.SUPER_ADMIN:
        await message.answer("You don't have admin privileges.")
        return
    
    await message.answer("Admin Panel:\n\n"
                         "/revoke_link - Revoke a link\n"
                         "/ban_user - Ban a user\n"
                         "/list_users - List all users")
