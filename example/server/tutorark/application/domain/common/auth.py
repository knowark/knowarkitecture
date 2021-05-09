from abc import ABC, abstractmethod
from typing import List, Optional
from contextvars import ContextVar
from .errors import AuthenticationError


class User:
    def __init__(self, **attributes):
        self.id = attributes.get('id', '')
        self.name = attributes.get('name', '')
        self.email = attributes.get('email', '')
        self.roles = attributes.get('roles', [])
        self.attributes = attributes.get('attributes', {})
        self.authorization = attributes.get('authorization', {})


class AuthProvider(ABC):
    """Authentication service."""
    @abstractmethod
    def setup(self, user: User) -> None:
        """Setup the AuthProvider for the current user"""

    @property
    @abstractmethod
    def user(self) -> User:
        """Get the current request user"""

    @property
    def reference(self) -> str:
        return self.user.id


user_var: ContextVar[Optional[User]] = ContextVar('user', default=None)


class StandardAuthProvider(AuthProvider):
    def setup(self, user: User) -> None:
        user_var.set(user)

    @property
    def user(self) -> User:
        user = user_var.get()
        if not user:
            raise AuthenticationError("Not authenticated.")
        return user
