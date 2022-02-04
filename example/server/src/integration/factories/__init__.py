from typing import Dict, Any
from injectark import FactoryBuilder
from .base_factory import BaseFactory
from .sql_factory import SqlFactory
from .check_factory import CheckFactory


factory_builder = FactoryBuilder([
    BaseFactory, CheckFactory, SqlFactory])
