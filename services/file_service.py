from database.connection import AsyncSessionLocal
from database.models.file import File
from sqlalchemy import select
from typing import Optional
import uuid

class FileService:
    @staticmethod
    async def create_file_record(
        name: str,
        file_id: str,
        file_size: int,
        mime_type: str,
        owner_id: int,
        channel_id: str,
        path: str
    ) -> File:
        """Create file record in database"""
        async with AsyncSessionLocal() as session:
            file_record = File(
                name=name,
                file_id=file_id,
                file_size=file_size,
                mime_type=mime_type,
                owner_id=owner_id,
                channel_id=channel_id,
                path=path
            )
            session.add(file_record)
            await session.commit()
            await session.refresh(file_record)
            return file_record
            
    @staticmethod
    async def get_file_by_id(file_id: int) -> Optional[File]:
        """Get file by ID"""
        async with AsyncSessionLocal() as session:
            stmt = select(File).where(File.id == file_id)
            result = await session.execute(stmt)
            return result.scalar_one_or_none()
            
    @staticmethod
    async def get_files_by_owner(owner_id: int) -> list:
        """Get all files owned by user"""
        async with AsyncSessionLocal() as session:
            stmt = select(File).where(File.owner_id == owner_id)
            result = await session.execute(stmt)
            return result.scalars().all()
