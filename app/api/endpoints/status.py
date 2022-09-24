from fastapi import APIRouter, Body, Depends, HTTPException, status, FastAPI, Response
from app.neo4j.neo4jConnection import Neo4jConnection

from app.custom.models.health import Health, Services, Neo4j
from app.custom.models.status import Status, MainOntology
from app.helpers.models.configuration.configuration import *

from app.helpers.swate_api import SwateAPI

from app.api.middlewares.http_basic_auth import *

router = APIRouter()


@router.get("/health", response_model=Health,
            responses={200: {"model": Health}, 503: {"model": Health}},
            status_code=status.HTTP_200_OK,
            summary="Get health status of services",
            )
async def health():

    conn = Neo4jConnection()
    db_status = conn.check()

    swate_version = "none"
    swate_api = SwateAPI()
    swate_version = swate_api.get_swate_version()

    neo4j_version = "none"
    status = "OK"
    neo4j_connection = "connected"
    if not db_status:
        neo4j_connection = "not connected"
        status = "degraded"
    else:
        neo4j_version = conn.get_neo4j_version()

    if swate_version == "none":
        status = "degraded"
        swate_version = "disconnected"


    return Health(
        services=Services(neo4j=Neo4j(status=neo4j_connection, version=neo4j_version), swate=swate_version,
                          rabbitmq="feature not implemented"),
        status=status
    )


@router.get("/info", response_model=Status,
            responses={200: {"model": Status}, 503: {}},
            status_code=status.HTTP_200_OK,
            summary="Get database informations",
            )
async def status():
    conn = Neo4jConnection()

    db_status = conn.check()

    if not db_status:
        return Response(status_code=503)

    number_terms = conn.get_number_terms()
    print("# terms", conn.get_number_terms())

    number_ontologies = conn.get_number_ontologies()
    number_templates = conn.get_number_templates()
    number_relations = conn.get_number_relationships()
    main_ontologies_db = conn.get_main_ontologies()


    main_ontologies = []
    for main_ontology in main_ontologies_db:
        print(main_ontology)
        ontology_model = MainOntology(name=main_ontology[0], version=main_ontology[1], lastUpdated=main_ontology[2])
        main_ontologies.append(ontology_model)





    return Status(number_terms=number_terms, number_ontologies=number_ontologies, number_templates=number_templates,
                  number_relationships=number_relations, main_ontologies=main_ontologies)


@router.get("/configuration", response_model=Configuration,
            responses={200: {"model": Configuration}},
            # status_code=status.HTTP_200_OK,
            summary="Get configuration parameters",
            dependencies=[Depends(basic_auth)])
async def config():

    swobup_username = os.environ.get("SWOBUP_USERNAME")
    swobup_password = os.environ.get("SWOBUP_PASSWORD")
    github_secret = os.environ.get("GITHUB_SECRET")

    neo4j_url = os.environ.get("DB_URL")
    neo4j_username = os.environ.get("DB_USER")
    neo4j_password = os.environ.get("DB_PASSWORD")

    swate_api = os.environ.get("SWATE_API")
    swate_ssl_verification = os.environ.get("TURN_OFF_SSL_VERIFY", False)

    s3_bucket = os.environ.get("s3_bucket")
    s3_access_key_id = os.environ.get("s3_access_key_id")
    s3_secret_access_key = os.environ.get("s3_secret_access_key")
    s3_base_path = os.environ.get("s3_base_path")
    s3_endpoint_url = os.environ.get("s3_endpoint_url")
    s3_region = os.environ.get("s3_region")

    s3_region = os.environ.get("s3_region")


    swobup_config = SwobupConfig(username=swobup_username,password=swobup_password, github_secret=github_secret)
    neo4j_config = Neo4jConfig(username=neo4j_username, password=neo4j_password, url=neo4j_url)
    swate_config = SwateConfig(api_url=swate_api, ssl_verification=swate_ssl_verification)
    s3_config = S3Config(access_key_id=s3_access_key_id, secret_access_key=s3_secret_access_key,
                         bucket=s3_bucket, base_path=s3_base_path, endpoint_url=s3_endpoint_url,
                         region=s3_region)
    #TODO
    mail_config = MailConfig()

    return Configuration(swobup=swobup_config, swate=swate_config, neo4j=neo4j_config, s3=s3_config, mail=mail_config)
