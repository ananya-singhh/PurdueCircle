from datetime import datetime
from typing import List


class Post(object):
    
    def __init__(self, author: str = None, post_id: str = None, topic: str = None, title: str = None, content: str = None, date_posted: datetime = None, liked_by: List = list(), saved_by: List = list(), anonymous: bool = False, comments: List = list(), image: str = None):
        self.author = author
        self.post_id = post_id
        self.topic = topic
        self.title = title
        self.content = content
        self.image = image # for now we will remove image
        self.date_posted = date_posted
        self.liked_by = liked_by
        self.saved_by = saved_by
        self.anonymous = anonymous
        self.comments = comments