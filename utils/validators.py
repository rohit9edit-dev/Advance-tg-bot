from typing import Optional, List
import re

def validate_file_extension(filename: str, allowed_extensions: List[str]) -> bool:
    """Validate file extension"""
    if not filename:
        return False
    
    # Extract extension
    parts = filename.rsplit('.', 1)
    if len(parts) < 2:
        return False
        
    extension = parts[1].lower()
    return extension in [ext.lower() for ext in allowed_extensions]

def validate_file_size(size: int, max_size: int) -> bool:
    """Validate file size"""
    return size <= max_size

def validate_telegram_id(telegram_id: str) -> bool:
    """Validate Telegram ID format"""
    return re.match(r'^\d+$', telegram_id) is not None
