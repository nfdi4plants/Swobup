from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from app.helpers.activity_database.activity_database import Base



class Activity(Base):
    __tablename__ = "actions"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime)
    message = Column(String)
    color = Column(String)