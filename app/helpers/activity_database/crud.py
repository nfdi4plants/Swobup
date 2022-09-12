from sqlalchemy.orm import Session

from . import models, schemas

def get_activities(db: Session):
    return db.query(models.Activity)

def create_activity(db:Session, activity: schemas.ActivityBase):
    db_activity = models.Activity(timestamp=activity.timestamp, message=activity.message, color=activity.color)
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity