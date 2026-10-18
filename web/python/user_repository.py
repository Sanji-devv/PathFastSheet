import json
import time
import threading
from pathlib import Path
from typing import Optional, Protocol, Dict
from core.user import User, generate_salt, hash_password, generate_session_token

class IUserRepository(Protocol):
    def get_user_by_id(self, user_id: str) -> Optional[User]:
        ...
    def get_user_by_username(self, username: str) -> Optional[User]:
        ...
    def create_user(self, username: str, password: str) -> User:
        ...
    def create_guest_user(self, guest_id: Optional[str] = None) -> User:
        ...
    def create_session(self, user_id: str) -> str:
        ...
    def get_user_by_session(self, token: str) -> Optional[User]:
        ...
    def delete_session(self, token: str) -> bool:
        ...

class JsonUserRepository:
    def __init__(self, storage_dir: Optional[Path] = None):
        if storage_dir is None:
            p = Path(__file__).resolve().parent
            if p.name == "python" and p.parent.name == "web":
                project_root = p.parent.parent
            else:
                project_root = p.parent
            self.storage_dir = project_root / "characters"
        else:
            self.storage_dir = Path(storage_dir)

        self.storage_dir.mkdir(parents=True, exist_ok=True)
        self.users_file = self.storage_dir / "users.json"
        self.sessions_file = self.storage_dir / "sessions.json"
        self._lock = threading.RLock()

        self._users: Dict[str, User] = {}
        self._sessions: Dict[str, dict] = {}
        self._load_data()

    def _load_data(self):
        with self._lock:
            if self.users_file.exists():
                try:
                    with open(self.users_file, 'r', encoding='utf-8') as f:
                        raw = json.load(f)
                    for item in raw:
                        u = User.from_dict(item)
                        self._users[u.id] = u
                except Exception as e:
                    print(f"Error loading users: {e}")
                    self._users = {}
            else:
                self._users = {}

            if self.sessions_file.exists():
                try:
                    with open(self.sessions_file, 'r', encoding='utf-8') as f:
                        self._sessions = json.load(f)
                except Exception as e:
                    print(f"Error loading sessions: {e}")
                    self._sessions = {}
            else:
                self._sessions = {}

    def _save_users(self):
        with self._lock:
            data = [u.to_dict(include_sensitive=True) for u in self._users.values()]
            with open(self.users_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

    def _save_sessions(self):
        with self._lock:
            with open(self.sessions_file, 'w', encoding='utf-8') as f:
                json.dump(self._sessions, f, ensure_ascii=False, indent=2)

    def get_user_by_id(self, user_id: str) -> Optional[User]:
        with self._lock:
            return self._users.get(user_id)

    def get_user_by_username(self, username: str) -> Optional[User]:
        with self._lock:
            target = username.strip().lower()
            for u in self._users.values():
                if u.username.lower() == target:
                    return u
            return None

    def create_user(self, username: str, password: str) -> User:
        with self._lock:
            clean_name = username.strip()
            if not clean_name:
                raise ValueError("Username cannot be empty")
            if len(clean_name) < 3:
                raise ValueError("Username must be at least 3 characters long")
            if not password or len(password) < 4:
                raise ValueError("Password must be at least 4 characters long")

            if self.get_user_by_username(clean_name):
                raise ValueError(f"User '{clean_name}' already exists")

            import re
            user_id = f"user_{re.sub(r'[^\w]', '_', clean_name).lower()}"
            base_id = user_id
            counter = 1
            while user_id in self._users:
                user_id = f"{base_id}_{counter}"
                counter += 1

            salt = generate_salt()
            pwd_hash = hash_password(password, salt)
            now = time.time()

            new_user = User(
                id=user_id,
                username=clean_name,
                password_hash=pwd_hash,
                salt=salt,
                is_guest=False,
                created_at=now,
                last_login=now
            )
            self._users[user_id] = new_user
            self._save_users()
            return new_user

    def create_guest_user(self, guest_id: Optional[str] = None) -> User:
        with self._lock:
            now = time.time()
            if not guest_id:
                guest_id = f"guest_{generate_session_token()[:8]}"

            if guest_id in self._users:
                return self._users[guest_id]

            user = User(
                id=guest_id,
                username=f"Guest ({guest_id[6:10]})",
                password_hash="",
                salt="",
                is_guest=True,
                created_at=now,
                last_login=now
            )
            self._users[guest_id] = user
            self._save_users()
            return user

    def create_session(self, user_id: str) -> str:
        with self._lock:
            user = self.get_user_by_id(user_id)
            if not user:
                raise ValueError("User does not exist")

            token = generate_session_token()
            now = time.time()
            user.last_login = now
            self._save_users()

            # Session valid for 30 days
            self._sessions[token] = {
                'user_id': user.id,
                'created_at': now,
                'expires_at': now + (30 * 86400)
            }
            self._save_sessions()
            return token

    def get_user_by_session(self, token: str) -> Optional[User]:
        if not token:
            return None
        with self._lock:
            session = self._sessions.get(token)
            if not session:
                return None
            if session.get('expires_at', 0) < time.time():
                self._sessions.pop(token, None)
                self._save_sessions()
                return None
            return self.get_user_by_id(session.get('user_id', ''))

    def delete_session(self, token: str) -> bool:
        if not token:
            return False
        with self._lock:
            if token in self._sessions:
                del self._sessions[token]
                self._save_sessions()
                return True
            return False
