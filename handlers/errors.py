from aiogram import Router
from aiogram.types import Message
from aiogram.filters import ExceptionFilter

router = Router()

@router.errors()
async def error_handler(update, exception):
    """Global error handler"""
    print(f"Error occurred: {exception}")
    return True  # Prevent default error handling
