import sqlalchemy
import logging

from sqlalchemy.orm import sessionmaker

from .models import Term
from .models import TermRelationship
from .models import Ontology

from .models import Protocol
from .models import ProtocolXml

from sqlalchemy.sql import *


class DatabaseConnector:
    def __init__(self, _host, _user, _password, _db_name):

        self.user = _user
        self.host = _host
        self.password = _password
        self.db_name = _db_name

        self.SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + self.user + ':' + self.password + '@' \
                                       + self.host + '/' + self.db_name
        self.is_connected = False
        self.connect_db()

    def connect_db(self):
        db = sqlalchemy.create_engine(self.SQLALCHEMY_DATABASE_URI)

        try:
            db.connect()
            self.is_connected = True
        except:
            self.is_connected = False

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

    def create_protocol_tables(self):
        # Base = declarative_base()
        engine = self.connect_db()
        # engine = sqlalchemy.create_engine(self.SQLALCHEMY_DATABASE_URI, echo=True)
        Protocol.__table__.create(bind=engine, checkfirst=False)
        ProtocolXml.__table__.create(bind=engine, checkfirst=False)

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

        if self.is_connected:

            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            for list_item in insert_tuple:
                # print("inserting:", list_item)
                _accession = list_item.get("Accession")
                _ontology_name = list_item.get("FK_OntologyName")
                _name = list_item.get("Name")
                _definition = list_item.get("Definition")
                _xref_value = list_item.get("XRefValueType")
                _is_obsolete = list_item.get("isObsolete")
                # for _key, _value in list_item.items():
                # print(_key + ":" +str(_value))

                row = Term(Accession=_accession, FK_OntologyName=_ontology_name, Name=_name, Definition=_definition,
                           XRefValueType=_xref_value, isObsolete=_is_obsolete)

                session.add(row)
                # print("row", row.Name)
                # sys.exit(0)
                session.commit()

            session.commit()
            session.close()
            db.dispose()
            logging.info("Term inserted")

    def insert_ontology(self, _name, _current_version, _definition, _date_created, _user_id):
        db = self.connect_db()

        if self.is_connected:
            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            row = Ontology(Name=_name, CurrentVersion=_current_version, Definition=_definition,
                           DateCreated=_date_created, UserID=_user_id)

            session.add(row)

            session.commit()
            session.close()
            db.dispose()
            logging.info("new ontology " + _name + " inserted")

    def ontology_entry_exists(self, name):

        db = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=db)
        session = _session()

        ontology_exists = session.query(Ontology.Name).filter_by(Name=name).first() is not None

        db.dispose()

        return ontology_exists

    def insert_relterms(self, insert_dict, ontology_name):
        db = self.connect_db()

        if self.is_connected:

            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            for list_item in insert_dict:
                _term_id = list_item.get("FK_TermAccession")
                _relationship_type = list_item.get("RelationshipType")
                _term_id_related = list_item.get("FK_TermAccession_Related")

                if _term_id_related is None:
                    continue

                if _term_id is None:
                    continue

                row = TermRelationship(FK_TermAccession=_term_id, FK_OntologyName=ontology_name,
                                       RelationshipType=_relationship_type,
                                       FK_TermAccession_Related=_term_id_related)

                # print(row.FK_TermID, row.RelationshipType, row.FK_TermID_Related)
                session.add(row)

            session.commit()
            session.close()
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

            engine.dispose()

            return ontology_id

    def delete_ontology_row(self, ontology_name):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        # delete rows
        session.query(Ontology).filter(Ontology.Name == ontology_name).delete()

        session.commit()
        logging.info("Ontology deleted: " + ontology_name)
        session.close()
        engine.dispose()

    def delete_rows(self, ontology_name):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        # find which ID has the ontology name
        ontology_query = session.query(Ontology.Name).filter(Ontology.Name == ontology_name)
        # this is every time only one loop cycle, so it doesnt matter for runtime
        for row in ontology_query.all():
            ontology_name = row.Name

        # delete rows
        session.query(Term).filter(Term.FK_OntologyName == ontology_name).delete()

        session.commit()
        logging.info("Rows deleted")
        session.close()
        engine.dispose()

    def select_rows(self):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        query = session.query(Term).filter(Term.FK_OntologyID == 2)

    def accession_entry_exists(self, accession):

        db = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=db)
        session = _session()

        exists = session.query(Term.Accession).filter_by(Accession=accession).first() is not None

        db.dispose()

        return exists

    def accession_to_id(self, accession):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        result = None

        query = session.query(Term.ID).filter(Term.Accession == accession)

        for row in query.all():
            result = row.ID

        engine.dispose()
        return result

    def insert_protocol(self, name, version, author, description, docs_link, tags, timestamp, rating, used):
        db = self.connect_db()

        if self.is_connected:
            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            row = Protocol(Name=name, Version=version, Author=author, Description=description,
                           DocsLink=docs_link, Tags=tags, Created=timestamp, Rating=rating, Used=used)

            session.add(row)
            session.commit()

            session.commit()
            session.close()
            db.dispose()
            logging.info("Protocol inserted")

    def update_protocol(self, name, version, author, description, docs_link, tags, timestamp):
        db = self.connect_db()

        if self.is_connected:
            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            session.query(Protocol).filter_by(Name=name). \
                update({Protocol.Name: name, Protocol.Version: version, Protocol.Author: author,
                        Protocol.Description: description, Protocol.DocsLink: docs_link, Protocol.Tags: tags,
                        Protocol.Created: timestamp})

            session.commit()

            session.commit()
            session.close()
            db.dispose()
            logging.info("Protocol updated")

    def update_protocol_xml(self, name, xml_type, xml):
        db = self.connect_db()

        if self.is_connected:

            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            session.query(ProtocolXml).filter_by(FK_Name=name).filter_by(XmlType=xml_type). \
                update({ProtocolXml.FK_Name: name, ProtocolXml.XmlType: xml_type, ProtocolXml.Xml: xml})

            session.commit()


            session.commit()
            session.close()
            db.dispose()
            logging.info("ProtocolXml updated")


    def insert_protocol_xml(self, name, xml_type, xml):
        db = self.connect_db()

        if self.is_connected:

            # create session
            _session = sessionmaker()
            _session.configure(bind=db)
            session = _session()

            row = ProtocolXml(FK_Name=name, XmlType=xml_type, Xml=xml)

            session.add(row)
            session.commit()


            session.commit()
            session.close()
            db.dispose()
            logging.info("ProtocolXml inserted")


    def protocol_entry_exists(self, name):

        db = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=db)
        session = _session()

        exists = session.query(Protocol.Name).filter_by(Name=name).first() is not None

        db.dispose()

        return exists

    def protocolxml_entry_exists(self, name, table_type):

        db = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=db)
        session = _session()

        table_exists = session.query(ProtocolXml.FK_Name).filter(and_(ProtocolXml.FK_Name.like(name),
                                                                      ProtocolXml.XmlType.like(
                                                                          table_type))).first() is not None
        db.dispose()

        exists = False

        if table_exists:
            exists = True

        return exists

    def delete_protocol_row(self, protocol_name):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        # delete rows
        session.query(Protocol).filter(Protocol.Name == protocol_name).delete()


        session.commit()
        logging.info("Rows deleted")
        session.close()
        engine.dispose()


    def get_used_rating(self, template_name):
        engine = self.connect_db()

        _session = sessionmaker()
        _session.configure(bind=engine)
        session = _session()

        protocol_query = session.query(Protocol).filter(Protocol.Name == template_name)

        query_dict = {"rating": 0, "used": 0}

        try:
            for row in protocol_query.all():
                protocol_rating = row.Rating
                protocol_used = row.Used

                query_dict["rating"] = protocol_rating
                query_dict["used"] = protocol_used

                engine.dispose()

        except:
            logging.info("table not found")

        return query_dict
