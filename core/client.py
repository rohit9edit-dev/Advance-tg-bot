from aiogram import Bot
from config import settings

def get_telegram_bot():
    """Initialize Telegram bot instance"""
    return Bot(token=settings.bot_token)
