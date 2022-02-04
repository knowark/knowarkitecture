from pytest import fixture
from typing import List, Type
from unittest.mock import MagicMock, AsyncMock
from tutorark.application.general.connector import (
    Connector, Connection)
from tutorark.application.general.connector import (
    Transactor as transactor_module)

@fixture
def transactionless(monkeypatch):
    return MagicMock(transactor_module.transactionless)

def test_connection_methods():
    methods = dir(Connection)
    assert 'fetch' in methods
    assert 'execute' in methods


def test_connector_methods():
    methods = Connector.__abstractmethods__  # type: ignore
    assert 'get' in methods
    assert 'put' in methods

def test_transactionless(transactionless):
    result = transactor_module.transactionless(None)
    assert result == []
