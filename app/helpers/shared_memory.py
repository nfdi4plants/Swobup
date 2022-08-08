from UltraDict import UltraDict
from typing import Any, Dict, Optional, Union, List

class Meta:
    def __init__(self, **kwargs: Dict[Any, Any]):
        # self.ultradict = UltraDict(name='fastapi_dict')
        # self.ultradict.update(**kwargs)
        self.ultradict = UltraDict(name="inv")
        self.ultradict.update(**kwargs)

        print("self", self.ultradict)

    # def increase_one(self, key: str):
    #     self.ultradict.update([(key, self.ultradict.get(key) + 1)])
    #
    # def reset(self, key: str):
    #     self.ultradict.update([(key, 0)])
    #
    # def report(self, item: Union[str, int]):
    #     return self.ultradict.get(item)

    def update_invertedList(self, invertedList):
        print("deict is", self.ultradict)
        self.ultradict.update([("inverted_list", invertedList)])


    def get_invertedList(self):
        return self.ultradict.get("inverted_list")