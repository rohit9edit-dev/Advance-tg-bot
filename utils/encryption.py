from cryptography.fernet import Fernet
from config import settings

# Generate key from settings (in production, this should come from a secure source)
key = settings.encryption_key.encode() if settings.encryption_key else Fernet.generate_key()
cipher_suite = Fernet(key)

def encrypt_data( str) -> bytes:
    """Encrypt data"""
    return cipher_suite.encrypt(data.encode())

def decrypt_data(encrypted_data: bytes) -> str:
    """Decrypt data"""
    return cipher_suite.decrypt(encrypted_data).decode()
