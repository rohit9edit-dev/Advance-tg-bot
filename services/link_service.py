from database.connection import AsyncSessionLocal
from database.models.link import Link
from database.models.file import File
from sqlalchemy import select
from datetime import datetime, timedelta
from utils.hash import generate_secure_token
from typing import Optional
import uuid

class LinkService:
    @staticmethod
    async def create_link(
        file_id: int,
        owner_id: int,
        expires_in_hours: Optional[int] = None,
        is_one_time: bool = False
    ) -> Link:
        """Create a secure link for a file"""
        token = generate_secure_token()
        
        # Calculate expiration
        expires_at = None
        if expires_in_hours:
            expires_at = datetime.utcnow() + timedelta(hours=expires_in_hours)
            
        async with AsyncSessionLocal() as session:
            link = Link(
                token=token,
                file_id=file_id,
                owner_id=owner_id,
                expires_at=expires_at,
                is_one_time=is_one_time
            )
            session.add(link)
            await session.commit()
            await session.refresh(link)
            return link
            
    @staticmethod
    async def get_link_by_token(token: str) -> Optional[Link]:
        """Get link by token"""
        async with AsyncSessionLocal() as session:
            stmt = select(Link).where(Link.token == token)
            result = await session.execute(stmt)
            return result.scalar_one_or_none()
            
    @staticmethod
    async def revoke_link(token: str) -> bool:
        """Revoke a link"""
        async with AsyncSessionLocal() as session:
            stmt = select(Link).where(Link.token == token)
            result = await session.execute(stmt)
            link = result.scalar_one_or_none()
            
            if link:
                link.is_revoked = True
                await session.commit()
                return True
            return False
