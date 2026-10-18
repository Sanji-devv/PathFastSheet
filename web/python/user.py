import os
import hashlib
import secrets
from dataclasses import dataclass, asdict
from typing import Optional

@dataclass
class User:
    id: str
    username: str
    password_hash: str
    salt: str
    is_guest: bool = False
    created_at: float = 0.0
    last_login: float = 0.0

    def to_dict(self, include_sensitive: bool = False) -> dict:
        d = {
            'id': self.id,
            'username': self.username,
            'is_guest': self.is_guest,
            'created_at': self.created_at,
            'last_login': self.last_login
        }
        if include_sensitive:
            d['password_hash'] = self.password_hash
            d['salt'] = self.salt
        return d

    @classmethod
    def from_dict(cls, data: dict) -> 'User':
        return cls(
            id=data.get('id', ''),
            username=data.get('username', ''),
            password_hash=data.get('password_hash', ''),
            salt=data.get('salt', ''),
            is_guest=bool(data.get('is_guest', False)),
            created_at=float(data.get('created_at', 0.0)),
            last_login=float(data.get('last_login', 0.0))
        )

    def verify_password(self, password: str) -> bool:
        if self.is_guest:
            return True
        if not self.password_hash or not self.salt:
            return False
        computed_hash = hash_password(password, self.salt)
        return secrets.compare_digest(self.password_hash, computed_hash)

def generate_salt() -> str:
    return secrets.token_hex(16)

def hash_password(password: str, salt: str) -> str:
    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        iterations=100000
    )
    return key.hex()

def generate_session_token() -> str:
    return secrets.token_urlsafe(32)
