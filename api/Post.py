from datetime import datetime


class Post(object):
    
    def __init__(self, username: str = None, post_id: str = None, topic_id: str = None, content: str = None, image = None, timestamp: datetime = None):
        self.username = username
        self.post_id = post_id
        self.topic_id = topic_id
        self.content = content
        self.image = image
        self.timestamp = timestamp
        