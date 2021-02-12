# Quickfix to store the bounded stream
class RequestStore:
    body = None

    def __init__(self):
        self.request = None

    def get_request(self):
        return self.request

    def save(self, request):
        RequestStore.body = request
