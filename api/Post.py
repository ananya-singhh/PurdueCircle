from datetime import datetime


class Post(object):
    
    def __init__(self, username: str = None, post_id: str = None, topic_id: str = None, title: str = None, content: str = None, timestamp: datetime = None):
        self.username = username
        self.post_id = post_id
        self.topic_id = topic_id
        self.title = title
        self.content = content
        #self.image = image # for now we will remove image
        self.timestamp = timestamp
        