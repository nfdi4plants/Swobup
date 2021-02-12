import sqlalchemy

from sqlalchemy import Column, Integer, String, DateTime, BigInteger, Boolean, ForeignKey, PrimaryKeyConstraint, \
    UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, backref
from sqlalchemy.dialects.mysql import DATETIME


Base = declarative_base()


class Ontology(Base):
    __tablename__ = "Ontology"
    ID = Column(BigInteger, primary_key=True, autoincrement=True)
    Name = Column(String(256), nullable=False, unique=True)
    CurrentVersion = Column(String(256), nullable=False)
    Definition = Column(String(1024), nullable=False)
    DateCreated = Column(DATETIME(fsp=6), nullable=False)
    UserID = Column(String(32), nullable=False)




class Term(Base):
    __tablename__ = 'Term'
    ID = Column(BigInteger, primary_key=True, autoincrement=True)
    Accession = Column(String(128), nullable=False, unique=True)
    FK_OntologyID = Column(BigInteger, ForeignKey('Ontology.ID'), nullable=False)
    Name = Column(String(1024), nullable=False, index=True )
    Definition = Column(String(2084), nullable=False,  index=True )
    XRefValueType = Column(String(50), nullable=True)
    isObsolete = Column(Boolean, nullable=False)
    children = relationship(
        "TermRelationship", back_populates="parent",
        cascade="all, delete",
        passive_deletes=True,
        foreign_keys="TermRelationship.FK_TermID"
    )


class TermRelationship(Base):
    __tablename__ = 'TermRelationship'
    ID = Column(BigInteger, primary_key=True, autoincrement=True)
    FK_TermID = Column(BigInteger, ForeignKey('Term.ID', ondelete="CASCADE"), nullable=True)
    RelationshipType = Column(String(64), nullable=True)
    #FK_TermID_Related = Column(BigInteger, ForeignKey('Term.ID', ondelete="CASCADE"), nullable=True)
    FK_TermID_Related = Column(BigInteger, ForeignKey('Term.ID', ondelete="CASCADE"), nullable=True)
    parent = relationship("Term", back_populates="children", foreign_keys='TermRelationship.FK_TermID')


