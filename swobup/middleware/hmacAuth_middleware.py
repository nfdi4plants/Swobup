import falcon
import base64
import logging
import os
import json

from ..helpers.configurator import Configurator
from ..helpers.hmac_validator import HMACValidator
from ..helpers.request_store import RequestStore

logging.basicConfig(level=logging.INFO)


class AuthMiddleware(object):
    def __init__(self):
        config = Configurator("swobup/config/config.conf")
        self.secret = config.get_config("github", "secret")
        self.hash_method = config.get_config("github", "hash_method")
        self.hmac_validator = HMACValidator(self.secret)

    def process_request(self, req, resp):
        body = req.bounded_stream.read().decode("utf-8")

        if self.hash_method == "sha256":
            token = req.get_header("X-Hub-Signature-256")
        elif self.hash_method == "sha1":
            token = req.get_header("X-Hub-Signature")
        else:
            token = None

        if token is None:
            description = ('Please provide an auth token '
                           'as part of the request.')
            raise falcon.HTTPUnauthorized("Auth token required",
                                          description)

        else:
            auth_header = token

            if auth_header is not None:

                if not self._hmac_credentials_are_valid(token, body):
                    description = ("The provided auth credentials are not valid.")

                    raise falcon.HTTPUnauthorized("Authentication required",
                                                  description)
                else:
                    request_storage = RequestStore()
                    request_storage.save(body)


            else:
                description = ("Authentication type is not supported.")
                raise falcon.HTTPUnauthorized("Authentication required",
                                              description)

    def _hmac_credentials_are_valid(self, token, body):

        if self.hmac_validator.validate_signature(token, body):

            logging.info("Auth_Middleware: %s credentials were valid", token)
            return True
        else:

            logging.info("Auth_Middleware: %s credentials were invalid", token)
            return False
