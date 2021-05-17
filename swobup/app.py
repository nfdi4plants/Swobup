import falcon
import sys

# middlewares
from .middleware.require_json import RequireJSON
from .middleware.cors_middleware import HandleCORS
from .middleware.hmacAuth_middleware import AuthMiddleware

# API
from .ApiCalls.ontology_update import OntologyUpdate
from .ApiCalls.delete_database import DeleteDatabase
from .ApiCalls.create_tables import CreateTables

from .ApiCalls.template_update import TemplateUpdate


api = application = falcon.App(middleware=[
    HandleCORS(),
    AuthMiddleware(),
    RequireJSON(),
])

print("falcon version:", falcon.__version__)
print("swobup version: ", "3.1")

delete_database = DeleteDatabase()
create_tables = CreateTables()


ontology_update = OntologyUpdate()
template_update = TemplateUpdate()

api.add_route('/api/v1/ontology', ontology_update)
api.add_route('/api/v1/template', template_update)

# testing routes
# api.add_route('/api/v1/delete', delete_database)
# api.add_route('/api/v1/createdb', create_tables)

