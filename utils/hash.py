import hashlib
import secrets
from typing import Optional

def generate_secure_token(length: int = 32) -> str:
    """Generate a cryptographically secure random token"""
    return secrets.token_urlsafe(length)

def hash_string(value: str, salt: Optional[str] = None) -> str:
    """Hash a string with optional salt"""
    if salt:
        value = f"{value}{salt}"
    return hashlib.sha256(value.encode()).hexdigest()
