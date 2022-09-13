from sqlalchemy.orm import Session

from . import models, schemas

def get_activities(db: Session, skip: int=0, limit: int=100):
    return db.query(models.Activity).offset(skip).limit(limit).all()

def create_activity(db:Session, activity: schemas.ActivityCreate):
    db_activity = models.Activity(message=activity.message, color=activity.color)
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    print("entry created")
    return db_activity