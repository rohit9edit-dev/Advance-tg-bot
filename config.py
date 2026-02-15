import os
from typing import Optional
from pydantic import BaseSettings

class Settings(BaseSettings):
    # Bot Configuration
    bot_token: str = os.getenv("BOT_TOKEN")
    bot_name: str = os.getenv("BOT_NAME", "FileStorageBot")
    
    # Required Channels
    required_channel_1: str = os.getenv("REQUIRED_CHANNEL_1")
    required_channel_2: str = os.getenv("REQUIRED_CHANNEL_2")
    
    # Database Configuration
    db_user: str = os.getenv("DB_USER", "postgres")
    db_password: str = os.getenv("DB_PASSWORD", "password")
    db_host: str = os.getenv("DB_HOST", "localhost")
    db_port: int = int(os.getenv("DB_PORT", "5432"))
    db_name: str = os.getenv("DB_NAME", "telegram_storage_bot")
    
    # Redis Configuration
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # Security
    secret_key: str = os.getenv("SECRET_KEY")
    encryption_key: str = os.getenv("ENCRYPTION_KEY")
    
    # Environment
    environment: str = os.getenv("ENVIRONMENT", "development")
    
    class Config:
        env_file = ".env"

settings = Settings()
