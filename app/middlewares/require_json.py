import fastapi
from fastapi import Request, HTTPException
import http


class Require_JSON:
    def __init__(self):
        self.bla = ""

    async def __call__(self, request: Request, call_next):
        # do something with the request object
        content_type = request.headers.get('Content-Type')
        print("content-type", content_type)


        # if content_type is not "application/json":
        #     raise HTTPException(status_code=406,
        #                         detail="'This API only supports responses encoded as JSON.")

        print("before")
        print("request method", request.method)

        if 'application/json' not in request.headers.get('Content-Type'):
            print("here")
            raise HTTPException(status_code=405,
                                detail='This API only supports requests encoded as JSON.')




        # process the request and get the response
        # response = await call_next(request)
        #
        # return response