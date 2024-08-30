import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")

GOV_API_URL = os.getenv("GOV_API_URL")
GOV_API_KEY = os.getenv("GOV_API_KEY")