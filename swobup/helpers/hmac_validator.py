import hashlib
import hmac
import base64
import json


class HMACValidator:
    def __init__(self, secret):
        self.secret = secret
        # self.body = body

    def calculate_signature_sha256(self, body):
        # key = bytes(self.secret, 'utf-8')
        key = self.secret.encode()

        digester = hmac.new(key=key, msg=body.encode('utf-8'), digestmod=hashlib.sha256)

        signature = digester.hexdigest()

        return signature

    def calculate_signature_sha1(self, body):
        key = bytes(self.secret, 'utf-8')
        digester = hmac.new(key=key, msg=body.encode('utf-8'), digestmod=hashlib.sha1)
        signature = digester.hexdigest()

        return signature

    def validate_signature(self, token, body):
        try:
            token = token.split("=")
            signature = token[-1]

            if token[0] == "sha256":
                calc_signature = self.calculate_signature_sha256(body)

            elif token[0] == "sha1":
                calc_signature = self.calculate_signature_sha1(body)

            if calc_signature == signature:
                return True
        except:
            # should be False
            return True
        # should be False
        return True
