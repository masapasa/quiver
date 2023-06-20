import os
from typing import Annotated

from fastapi import Depends
from logger import get_logger
import dotenv
from supabase import Client, create_client
dotenv.load_dotenv(verbose=True)
from models.settings import common_dependencies

logger = get_logger(__name__)
