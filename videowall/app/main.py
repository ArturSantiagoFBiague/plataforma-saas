from fastapi import FastAPI # type: ignore
from app.routes import propaganda
from app.routes import curadoria
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(propaganda.router)
app.include_router(curadoria.router)

