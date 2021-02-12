import falcon

# middlewares
from .middleware.require_json import RequireJSON
from .middleware.cors_middleware import HandleCORS
from .middleware.hmacAuth_middleware import AuthMiddleware

# API
from .ApiCalls.update_database import UpdateDatabase
from .ApiCalls.delete_database import DeleteDatabase
from .ApiCalls.create_tables import CreateTables

api = application = falcon.API(middleware=[
    HandleCORS(),
    AuthMiddleware(),
    RequireJSON(),
])

print("falcon version:", falcon.__version__)

update_database = UpdateDatabase()
delete_database = DeleteDatabase()
create_tables = CreateTables()

api.add_route('/api/v1/update', update_database)

# testing routes
# api.add_route('/api/v1/delete', delete_database)
# api.add_route('/api/v1/createdb', create_tables)
