from datetime import datetime


class Message(object):
    
    def __init__(self, message_id: str = None, message_thread_id: str = None, content: str = None, sender: str = None, receiver: str = None, timestamp: datetime = None):
        self.message_id = message_id
        self.message_thread_id = message_thread_id
        self.content = content
        self.sender = sender
        self.receiver = receiver
        self.timestamp = timestamp