from datetime import datetime
from time import time


class Comment(object):
    
    def __init__(self, author: str = None, comment_id: str = None, post_id: str = None, content: str = None, date_posted: datetime = None):
        self.author = author
        self.comment_id = comment_id
        self.post_id = post_id
        self.content = content
        self.date_posted = date_posted