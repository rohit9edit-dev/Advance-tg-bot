import redis.asyncio as redis
from config import settings
import json

class RedisClient:
    def __init__(self):
        self.redis = redis.from_url(settings.redis_url, decode_responses=True)
    
    async def set(self, key: str, value: str, expire: int = 3600):
        """Set a key-value pair with expiration"""
        await self.redis.setex(key, expire, value)
    
    async def get(self, key: str) -> str:
        """Get value by key"""
        return await self.redis.get(key)
    
    async def delete(self, key: str):
        """Delete key"""
        await self.redis.delete(key)
    
    async def exists(self, key: str) -> bool:
        """Check if key exists"""
        return await self.redis.exists(key)

redis_client = RedisClient()
