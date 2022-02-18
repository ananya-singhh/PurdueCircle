from typing import List

class User(object):
    
    def __init__(self, email: str = None, username: str = None, password: str = None, bio: str = None):
        self.username = username
        self.email = email
        self.password = password
        self.bio = bio
        
    
    def to_dict(self):
        return {
            'email': self.email,
            'username': self.username,
            'bio': self.bio,
            'password': self.password,
            
        }
        
        