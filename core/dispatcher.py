from aiogram import Dispatcher
from core.client import get_telegram_bot

def setup_dispatcher():
    """Setup main dispatcher"""
    dp = Dispatcher()
    return dp
