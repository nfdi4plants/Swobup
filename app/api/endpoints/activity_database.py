from fastapi import APIRouter, Body, Depends, HTTPException, status, Response
from typing import List

from app.tasks.database_tasks import clear_database_task
from app.neo4j.neo4jConnection import Neo4jConnection

from app.api.middlewares.http_basic_auth import *

from sqlalchemy.orm import Session

from app.helpers.activity_database.activity_database import SessionLocal, engine
from app.helpers.activity_database import crud, models, schemas

models.Base.metadata.create_all(bind=engine)

router = APIRouter()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/actions/", response_model=List[schemas.Activity])
def get_actions(db:Session = Depends(get_db)):
    return crud.get_activities(db=db)


@router.put("/actions/", response_model=schemas.Activity)
def get_actions(activity: schemas.Activity, db:Session = Depends(get_db)):
    # db_activity = crud.create_activity(db, activity=activity)
    return crud.create_activity(db, activity=activity)