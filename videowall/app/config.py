import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://saas:senha_segura@172.17.0.1:5432/plataforma")
UPLOAD_DIR = "uploads"
