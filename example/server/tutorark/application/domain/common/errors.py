# Base

class ApplicationError(Exception):
    """Application's base error class."""


class AuthenticationError(ApplicationError):
    """Authentication error"""
