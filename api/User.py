from typing import List

class User(object):
    
    def __init__(self, id: int = None, email: str = None, username: str = None, password: str = None, bio: str = None, posts: List[int] = None, friends: List[int] = None,):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.bio = bio
        self.posts = posts
        self.friends = friends
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'bio': self.bio,
            'password': self.password
        }
        
        