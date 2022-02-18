from datetime import datetime
from time import time


class Comment(object):
    
    def __init__(self, username: str = None, comment_id: str = None, post_id: str = None, content: str = None, timestamp: datetime = None):
        self.username = username
        self.comment_id = comment_id
        self.post_id = post_id
        self.content = content
        self.timestamp = timestamp