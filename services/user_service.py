from sqlalchemy import select
from database.connection import AsyncSessionLocal
from database.models.user import User, UserRole
from typing import Optional

class UserService:
    @staticmethod
    async def get_or_create_user(telegram_id: str, username: Optional[str] = None) -> User:
        """Get or create user"""
        async with AsyncSessionLocal() as session:
            stmt = select(User).where(User.telegram_id == telegram_id)
            result = await session.execute(stmt)
            user = result.scalar_one_or_none()
            
            if not user:
                user = User(
                    telegram_id=telegram_id,
                    username=username
                )
                session.add(user)
                await session.commit()
                await session.refresh(user)
                
            return user
            
    @staticmethod
    async def update_user_role(telegram_id: str, role: UserRole) -> bool:
        """Update user role"""
        async with AsyncSessionLocal() as session:
            stmt = select(User).where(User.telegram_id == telegram_id)
            result = await session.execute(stmt)
            user = result.scalar_one_or_none()
            
            if user:
                user.role = role
                await session.commit()
                return True
            return False
            
    @staticmethod
    async def get_user_by_id(user_id: int) -> Optional[User]:
        """Get user by ID"""
        async with AsyncSessionLocal() as session:
            stmt = select(User).where(User.id == user_id)
            result = await session.execute(stmt)
            return result.scalar_one_or_none()
