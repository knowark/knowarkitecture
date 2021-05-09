from pytest import fixture, raises
from tutorark.application.domain.common import (
    User, AuthProvider, StandardAuthProvider, AuthenticationError)


def test_auth_provider_repository_methods():
    abstract_methods = AuthProvider.__abstractmethods__  # type: ignore

    assert 'setup' in abstract_methods
    assert 'user' in abstract_methods


@fixture
def auth_provider() -> StandardAuthProvider:
    auth_provider = StandardAuthProvider()
    auth_provider.setup(User(id='001', name="eecheverry"))
    return auth_provider


def test_standard_auth_provider(auth_provider):
    assert issubclass(StandardAuthProvider, AuthProvider)
    assert isinstance(auth_provider, AuthProvider)


def test_standard_auth_properties(auth_provider):
    assert auth_provider.user.name == "eecheverry"
    assert auth_provider.reference == '001'


def test_standard_auth_no_authenticated_user(auth_provider):
    auth_provider.setup(None)

    with raises(AuthenticationError):
        user = auth_provider.user
