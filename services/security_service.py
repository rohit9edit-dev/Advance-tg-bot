from utils.hash import hash_string
from utils.encryption import encrypt_data, decrypt_data
from typing import Optional
from datetime import datetime, timedelta
import secrets

class SecurityService:
    @staticmethod
    def generate_session_token() -> str:
        """Generate a secure session token"""
        return secrets.token_urlsafe(64)
    
    @staticmethod
    def verify_session_token(token: str, expected_hash: str) -> bool:
        """Verify session token against hash"""
        return hash_string(token) == expected_hash
    
    @staticmethod
    def encrypt_sensitive_data( str) -> bytes:
        """Encrypt sensitive data"""
        return encrypt_data(data)
    
    @staticmethod
    def decrypt_sensitive_data(encrypted_ bytes) -> str:
        """Decrypt sensitive data"""
        return decrypt_data(encrypted_data)
    
    @staticmethod
    def generate_rate_limit_key(user_id: str, action: str) -> str:
        """Generate rate limit key"""
        return f"rate_limit:{user_id}:{action}"
    
    @staticmethod
    def is_rate_limited(redis_client, key: str, limit: int, window: int) -> bool:
        """Check if user is rate limited"""
        # Implementation would depend on how we track requests
        # This is a simplified version
        return False
