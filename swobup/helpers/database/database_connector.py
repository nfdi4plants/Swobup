import sqlalchemy
import cryptography
import logging
import sys

from sqlalchemy.exc import SQLAlchemyError

# from .models import *
from sqlalchemy.orm import sessionmaker

from ..database.models import Term
from ..database.models import TermRelationship
from .models import Term
from .models import TermRelationship
from .models import Ontology

from ..configurator import Configurator

from sqlalchemy.sql import *

from sqlalchemy import MetaData, Table, create_engine


class DatabaseConnector:
    def __init__(self, _host, _user, _password, _db_name):
        # self.SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://marcel:test@127.0.0.1/swatedb2'

        self.user = _user
        self.host = _host
        self.password = _password
        self.db_name = _db_name

        self.bla = "bla"

        self.SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + self.user + ':' + self.password + '@' \
                                       + self.host + '/' + self.db_name
        self.is_connected = False
        self.connect_db()

    def connect_db(self):
        # print("dbconnect - connect")
        # _load_db_vars()
        # create db create_engine
        # db = create_engine(f'postgresql://{DB_USER}:{DB_PASS}@{DB_IP}:{DB_PORT}/{DB_NAME}')
        # db = sqlalchemy.create_engine(self.SQLALCHEMY_DATABASE_URI, echo=True)
        db = sqlalchemy.create_engine(self.SQLALCHEMY_DATABASE_URI)

        try:
            # print("connection")
            db.connect()
            self.is_connected = True
        except:
            self.is_connected = False

        # print("db", db)
        return db

    def is_connected(self):
        return self.is_connected

    # TODO
    def disconnect_db(self, db):
        db.dispose()

    def test(self):
        engine = sqlalchemy.create_engine(self.SQLALCHEMY_DATABASE_URI, echo=True)
        print(engine.table_names())

    def create_tables(self):
        # Base = declarative_base()
        engine = self.connect_db()
        # engine = sqlalchemy.create_engine(self.SQLALCHEMY_DATABASE_URI, echo=True)
        Ontology.__table__.create(bind=engine, checkfirst=False)
        Term.__table__.create(bind=engine, checkfirst=False)
        TermRelationship.__table__.create(bind=engine, checkfirst=False)

    def drop_tables(self):
        # Base = declarative_base()
        engine = self.connect_db()
        # engine = sqlalchemy.create_engine(self.SQLALCHEMY_DATABASE_URI, echo=True)
        TermRelationship.__table__.drop(engine)
        Term.__table__.drop(engine)
        Ontology.__table__.drop(engine)

    def insert_terms(self, insert_tuple):
        db = self.connect_db()
        # conn = engine.connect()
        # result = conn.execute(Term.insert(),[insert_tuple])

        print("insert term begin")
        print("is connected", self.is_connected)

        if self.is_connected:

            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            print("tuple", insert_tuple)

            for list_item in insert_tuple:
                # print("inserting:", list_item)
                _accession = list_item.get("Accession")
                _ontology_id = list_item.get("FK_OntologyID")
                _name = list_item.get("Name")
                _definition = list_item.get("Definition")
                _xref_value = list_item.get("XRefValueType")
                _is_obsolete = list_item.get("isObsolete")
                # for _key, _value in list_item.items():
                # print(_key + ":" +str(_value))

                row = Term(Accession=_accession, FK_OntologyID=_ontology_id, Name=_name, Definition=_definition,
                           XRefValueType=_xref_value, isObsolete=_is_obsolete)

                session.add(row)
                # sys.exit(0)
                session.commit()

            try:
                print("trying inserting term")
                session.commit()
                session.close()
                db.dispose()
                logging.info("Term inserted")

            except:
                session.close()
                logging.error("Error inserting Term")

            db.dispose()

    def insert_relterms(self, insert_dict):
        db = self.connect_db()

        if self.is_connected:

            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            for list_item in insert_dict:
                _term_id = list_item.get("FK_TermID")
                _relationship_type = list_item.get("RelationshipType")
                _term_id_related = list_item.get("FK_TermID_Related")

                if _term_id_related is None:
                    print("termid_rel is None", list_item)
                    continue

                if _term_id is None:
                    print("term_id is None", list_item)
                    continue

                row = TermRelationship(FK_TermID=_term_id, RelationshipType=_relationship_type,
                                       FK_TermID_Related=_term_id_related)

                # print(row.FK_TermID, row.RelationshipType, row.FK_TermID_Related)
                session.add(row)

            try:
                session.commit()
                session.close()

                logging.info("Related Term inserted")
            except:
                logging.error("Error inserting Related Term")

            db.dispose()
            # session.close()

    def get_ontology_id(self, ontology_name):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        # find which ID has ontology with name 'po'
        ontology_query = session.query(Ontology.ID).filter(Ontology.Name == ontology_name)
        for row in ontology_query.all():
            ontology_id = row.ID

            return ontology_id

    def delete_rows(self, ontology_name):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        # find which ID has the ontology name
        ontology_query = session.query(Ontology.ID).filter(Ontology.Name == ontology_name)
        # this is every time only one loop cycle, so it doesnt matter for runtime
        for row in ontology_query.all():
            ontology_id = row.ID

        print("query",ontology_query)

        # delete rows
        session.query(Term).filter(Term.FK_OntologyID == ontology_id).delete()

        try:
            session.commit()
            logging.info("Rows deleted")
            session.close()
            engine.dispose()
        except:
            logging.error("Rows could not deleted.")

    def select_rows(self):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        query = session.query(Term).filter(Term.FK_OntologyID == 2)

    def accession_to_id(self, accession):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        result = None

        query = session.query(Term.ID).filter(Term.Accession == accession)

        for row in query.all():
            # print(row.ID)
            result = row.ID

        # print("ID", query)

        return result
