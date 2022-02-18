class MessageThread(object):
    
    def __init__(self, message_thread_id: str = None, user1: str = None, user2: str = None, messages = None):
        self.message_thread_id = message_thread_id
        self.user1 = user1
        self.user2 = user2
        self.messages = messages