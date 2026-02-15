#!/usr/bin/env python3
"""Cleanup script for expired links and files"""

import asyncio
from datetime import datetime
from database.connection import AsyncSessionLocal
from database.models.link import Link
from database.models.file import File

async def cleanup_expired_links():
    """Clean up expired links"""
    async with AsyncSessionLocal() as session:
        # Find expired links
        stmt = session.query(Link).filter(Link.expires_at < datetime.utcnow())
        expired_links = await session.execute(stmt)
        expired_links = expired_links.scalars().all()
        
        # Mark as revoked
        for link in expired_links:
            link.is_revoked = True
            
        await session.commit()
        print(f"Revoked {len(expired_links)} expired links")

if __name__ == "__main__":
    asyncio.run(cleanup_expired_links())
