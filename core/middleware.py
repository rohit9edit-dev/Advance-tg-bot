from aiogram import BaseMiddleware
from aiogram.types import Message, CallbackQuery, InlineQuery
from typing import Callable, Awaitable, Dict, Any
from database.connection import AsyncSessionLocal
from database.models.user import User
from sqlalchemy import select
from core.client import get_telegram_bot
import asyncio

class AuthMiddleware(BaseMiddleware):
    """Authentication middleware"""
    
    async def __call__(
        self,
        handler: Callable[[Message, Dict[str, Any]], Awaitable[Any]],
        event: Message,
         Dict[str, Any]
    ) -> Any:
        # Get or create user
        async with AsyncSessionLocal() as session:
            stmt = select(User).where(User.telegram_id == str(event.from_user.id))
            result = await session.execute(stmt)
            user = result.scalar_one_or_none()
            
            if not user:
                # Create new user
                user = User(
                    telegram_id=str(event.from_user.id),
                    username=event.from_user.username
                )
                session.add(user)
                await session.commit()
                await session.refresh(user)
            
            data["user"] = user
            return await handler(event, data)

class ForceJoinMiddleware(BaseMiddleware):
    """Force join middleware for required channels"""
    
    def __init__(self):
        self.bot = get_telegram_bot()
        
    async def __call__(
        self,
        handler: Callable[[Message, Dict[str, Any]], Awaitable[Any]],
        event: Message,
         Dict[str, Any]
    ) -> Any:
        user = data.get("user")
        if not user:
            return await handler(event, data)
            
        # Check if user has joined both required channels
        required_channels = [
            settings.required_channel_1,
            settings.required_channel_2
        ]
        
        joined_channels = set()
        for channel in required_channels:
            try:
                member = await self.bot.get_chat_member(channel, user.telegram_id)
                if member.status in ["member", "administrator", "creator"]:
                    joined_channels.add(channel)
            except Exception:
                pass  # User not in channel
                
        # If not joined both channels, send message and don't process
        if len(joined_channels) < 2:
            await event.answer(
                "You must join both required channels before using this bot.\n\n"
                f"1. {settings.required_channel_1}\n"
                f"2. {settings.required_channel_2}"
            )
            return None
            
        # Store joined channels in user record
        user.joined_channels = ",".join(joined_channels)
        async with AsyncSessionLocal() as session:
            session.add(user)
            await session.commit()
            
        return await handler(event, data)
