import sqlalchemy

from sqlalchemy import Column, Integer, String, DateTime, BigInteger, Boolean, ForeignKey, PrimaryKeyConstraint, \
    UniqueConstraint, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, backref
from sqlalchemy.dialects.mysql import DATETIME


Base = declarative_base()


class Ontology(Base):
    __tablename__ = "Ontology"
    #ID = Column(BigInteger, primary_key=True, autoincrement=True)
    Name = Column(String(256), primary_key=True, nullable=False, unique=True)
    CurrentVersion = Column(String(256), nullable=False)
    Definition = Column(String(1024), nullable=False)
    DateCreated = Column(DATETIME(fsp=6), nullable=False)
    UserID = Column(String(32), nullable=False)
    children = relationship(
        "Term", back_populates="parent",
        cascade="all, delete",
        passive_deletes=True,
        foreign_keys="TermRelationship.FK_OntologyName"
    )
    children_termRelation = relationship(
        "Term", back_populates="parent_termRelation",
        cascade="all, delete",
        passive_deletes=True,
        foreign_keys="Term.FK_OntologyName"
    )





class Term(Base):
    __tablename__ = 'Term'
    #ID = Column(BigInteger, primary_key=True, autoincrement=True)
    Accession = Column(String(128), nullable=False, unique=True, primary_key=True)
    FK_OntologyName = Column(String(256), ForeignKey('Ontology.Name'), nullable=False)
    Name = Column(String(1024), nullable=False, index=True )
    Definition = Column(String(2084), nullable=False,  index=True )
    XRefValueType = Column(String(256), nullable=True)
    isObsolete = Column(Boolean, nullable=False)
    parent = relationship(
        "Ontology", back_populates="parent",
        foreign_keys="Term.FK_OntologyName"
    )


class TermRelationship(Base):
    __tablename__ = 'TermRelationship'
    ID = Column(BigInteger, primary_key=True, autoincrement=True)
    FK_TermAccession = Column(String(128), nullable=True)
    FK_OntologyName = Column(String(256), ForeignKey('Ontology.Name',ondelete="CASCADE"), nullable=False)
    RelationshipType = Column(String(64), nullable=True)
    #FK_TermID_Related = Column(BigInteger, ForeignKey('Term.ID', ondelete="CASCADE"), nullable=True)
    FK_TermAccession_Related = Column(String(128), nullable=True)
    parent_termRelation = relationship("Ontology", back_populates="children_termRelation",
                          foreign_keys='TermRelationship.FK_OntologyName')


class Protocol(Base):
    __tablename__ = 'Protocol'
    #ID = Column(BigInteger, primary_key=True, autoincrement=True)
    Name = Column(String(512), primary_key=True, nullable=False, index=True)
    Version = Column(String(128), nullable=False, index=True)
    Created = Column(DATETIME(fsp=6), nullable=False)
    Author = Column(String(256), nullable=False, index=True)
    Description = Column(Text, nullable=False, index=True)
    DocsLink = Column(String(1024), nullable=False, index=True)
    Tags = Column(String(1024), nullable=False, index=True)
    Used = Column(Integer, nullable=False, index=True)
    Rating = Column(Integer, nullable=False, index=True)
    protocol_children = relationship(
        "ProtocolXml",
        back_populates="protocol_parent",
        cascade="all, delete, save-update",
        passive_deletes=True,
        foreign_keys="ProtocolXml.FK_Name"
    )

class ProtocolXml(Base):
    __tablename__ = 'ProtocolXml'
    ID = Column(BigInteger, primary_key=True, autoincrement=True, index=True)
    FK_Name = Column(String(512), ForeignKey('Protocol.Name', ondelete="CASCADE", onupdate="CASCADE"), nullable=True)
    XmlType = Column(String(128), nullable=False, index=True)
    Xml = Column(Text, nullable=False, index=True)
    protocol_parent = relationship("Protocol",
                                   back_populates="protocol_children",
                                   foreign_keys='ProtocolXml.FK_Name'
                                   )
