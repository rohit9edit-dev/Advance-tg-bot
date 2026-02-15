import asyncio
import logging
from datetime import datetime, timedelta
from typing import Callable, Any, Optional
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from database.connection import AsyncSessionLocal
from database.models.link import Link
from database.models.file import File
from database.models.access_log import AccessLog
from services.file_service import FileService
from services.link_service import LinkService
from utils.hash import generate_secure_token

logger = logging.getLogger(__name__)

class Scheduler:
    """
    Async scheduler for background tasks
    """
    
    def __init__(self):
        self.scheduler = AsyncIOScheduler()
        self.running = False
    
    async def start(self):
        """Start the scheduler with all scheduled tasks"""
        if not self.running:
            # Schedule cleanup tasks
            self.scheduler.add_job(
                self.cleanup_expired_links,
                trigger=IntervalTrigger(minutes=30),
                id="cleanup_expired_links"
            )
            
            self.scheduler.add_job(
                self.cleanup_expired_files,
                trigger=IntervalTrigger(hours=1),
                id="cleanup_expired_files"
            )
            
            self.scheduler.add_job(
                self.cleanup_old_logs,
                trigger=IntervalTrigger(hours=6),
                id="cleanup_old_logs"
            )
            
            self.scheduler.add_job(
                self.update_analytics_cache,
                trigger=IntervalTrigger(hours=1),
                id="update_analytics_cache"
            )
            
            self.scheduler.start()
            self.running = True
            logger.info("Scheduler started with background tasks")
    
    async def stop(self):
        """Stop the scheduler"""
        if self.running:
            self.scheduler.shutdown()
            self.running = False
            logger.info("Scheduler stopped")
    
    async def cleanup_expired_links(self):
        """Remove expired links from database"""
        logger.info("Running cleanup_expired_links task")
        try:
            async with AsyncSessionLocal() as session:
                # Find expired links (not revoked)
                stmt = session.query(Link).filter(
                    Link.expires_at < datetime.utcnow(),
                    Link.is_revoked == False
                )
                expired_links = await session.execute(stmt)
                expired_links = expired_links.scalars().all()
                
                # Mark as revoked
                for link in expired_links:
                    link.is_revoked = True
                    
                await session.commit()
                
                logger.info(f"Revoked {len(expired_links)} expired links")
                
        except Exception as e:
            logger.error(f"Error in cleanup_expired_links: {e}")
    
    async def cleanup_expired_files(self):
        """Cleanup expired or unused files"""
        logger.info("Running cleanup_expired_files task")
        try:
            # In a real implementation, this would remove files from Telegram channels
            # and delete records from database
            
            # For now, just log that we would do cleanup
            logger.info("Expired files cleanup would happen here")
            
        except Exception as e:
            logger.error(f"Error in cleanup_expired_files: {e}")
    
    async def cleanup_old_logs(self):
        """Remove old access logs"""
        logger.info("Running cleanup_old_logs task")
        try:
            async with AsyncSessionLocal() as session:
                # Remove logs older than 30 days
                cutoff_date = datetime.utcnow() - timedelta(days=30)
                stmt = session.query(AccessLog).filter(
                    AccessLog.accessed_at < cutoff_date
                )
                old_logs = await session.execute(stmt)
                old_logs = old_logs.scalars().all()
                
                # Delete old logs
                for log in old_logs:
                    await session.delete(log)
                    
                await session.commit()
                
                logger.info(f"Removed {len(old_logs)} old access logs")
                
        except Exception as e:
            logger.error(f"Error in cleanup_old_logs: {e}")
    
    async def update_analytics_cache(self):
        """Update analytics cache data"""
        logger.info("Running update_analytics_cache task")
        try:
            # In a real implementation, this would:
            # 1. Aggregate usage statistics
            # 2. Update cache with latest metrics
            # 3. Store summary data for dashboards
            
            # For now, just log that we would update cache
            logger.info("Analytics cache update would happen here")
            
        except Exception as e:
            logger.error(f"Error in update_analytics_cache: {e}")
    
    async def schedule_task(self, func: Callable, interval_minutes: int, *args, **kwargs):
        """Schedule a one-time task to run at regular intervals"""
        job_id = f"task_{generate_secure_token(16)}"
        self.scheduler.add_job(
            func,
            trigger=IntervalTrigger(minutes=interval_minutes),
            id=job_id,
            args=args,
            kwargs=kwargs
        )
        logger.info(f"Scheduled task {job_id} to run every {interval_minutes} minutes")
    
    async def remove_scheduled_task(self, job_id: str):
        """Remove a scheduled task"""
        if self.scheduler.get_job(job_id):
            self.scheduler.remove_job(job_id)
            logger.info(f"Removed scheduled task {job_id}")

# Global scheduler instance
scheduler = Scheduler()
