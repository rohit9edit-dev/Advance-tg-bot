from database.connection import AsyncSessionLocal
from database.models.access_log import AccessLog
from sqlalchemy import select, func
from datetime import datetime, timedelta
from typing import Dict, List

class AnalyticsService:
    @staticmethod
    async def get_daily_stats(days: int = 7) -> Dict:
        """Get daily statistics"""
        async with AsyncSessionLocal() as session:
            # Get stats for last n days
            end_date = datetime.utcnow()
            start_date = end_date - timedelta(days=days)
            
            # Count uploads
            stmt = select(func.count(AccessLog.id)).where(
                AccessLog.accessed_at >= start_date
            )
            total_accesses = await session.execute(stmt)
            total_accesses = total_accesses.scalar()
            
            return {
                "total_accesses": total_accesses,
                "period_days": days
            }
    
    @staticmethod
    async def get_top_files(limit: int = 10) -> List:
        """Get top downloaded files"""
        async with AsyncSessionLocal() as session:
            # In a real implementation, this would be more complex
            # This is a placeholder
            return []
