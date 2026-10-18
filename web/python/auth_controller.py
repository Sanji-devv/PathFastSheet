from typing import Optional, Tuple
from core.user import User
from core.user_repository import IUserRepository, JsonUserRepository

class AuthController:
    """
    Controller responsible for User Authentication and Session Management (MVC & SOLID).
    """

    def __init__(self, user_repository: Optional[IUserRepository] = None):
        self.user_repository = user_repository or JsonUserRepository()

    def register(self, payload: dict) -> Tuple[dict, Optional[str], int]:
        username = payload.get('username', '').strip()
        password = payload.get('password', '').strip()

        if not username or not password:
            return {'error': 'Username and password are required'}, None, 400

        try:
            user = self.user_repository.create_user(username, password)
            token = self.user_repository.create_session(user.id)
            return {
                'status': 'ok',
                'message': f"User '{user.username}' successfully registered",
                'user': user.to_dict(),
                'token': token
            }, token, 201
        except ValueError as ve:
            return {'error': str(ve)}, None, 400
        except Exception as e:
            return {'error': f"Registration error: {e}"}, None, 500

    def login(self, payload: dict) -> Tuple[dict, Optional[str], int]:
        username = payload.get('username', '').strip()
        password = payload.get('password', '').strip()

        if not username or not password:
            return {'error': 'Username and password are required'}, None, 400

        user = self.user_repository.get_user_by_username(username)
        if not user or not user.verify_password(password):
            return {'error': 'Invalid username or password'}, None, 401

        token = self.user_repository.create_session(user.id)
        return {
            'status': 'ok',
            'message': f"Welcome back, {user.username}!",
            'user': user.to_dict(),
            'token': token
        }, token, 200

    def logout(self, token: str) -> dict:
        if token:
            self.user_repository.delete_session(token)
        return {'status': 'ok', 'message': 'Logged out successfully'}

    def get_or_create_user(self, token: Optional[str]) -> Tuple[User, Optional[str]]:
        """
        Resolves the user from session token. If none or expired, generates a guest session.
        Returns (User, new_token_if_created).
        """
        if token:
            user = self.user_repository.get_user_by_session(token)
            if user:
                return user, None

        # Create guest user and session
        guest_user = self.user_repository.create_guest_user()
        new_token = self.user_repository.create_session(guest_user.id)
        return guest_user, new_token
