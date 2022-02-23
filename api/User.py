from typing import List
from .Constants import *

class User(object):
    
    def __init__(self, email: str = None, username: str = None, password: str = None, bio: str = None, profile_picture: int = 0, privacy_setting: int = 0, followers: List = list(), following: List = list(), blocked: List = list(), blocked_by: List = list()):
        self.username = username
        self.email = email
        self.password = password
        self.bio = bio
        self.profile_picture = profile_picture
        self.privacy_setting = privacy_setting
        self.followers = followers
        self.following = following
        self.blocked = blocked
        self.blocked_by = blocked_by
        
    
    def to_dict(self):
        return {
            'email': self.email,
            'username': self.username,
            'bio': self.bio,
            'privacy_setting': self.privacy_setting,
            'profile_picture': self.profile_picture,
            'password': self.password,
            'followers': self.followers,
            'following': self.following,
            'blocked': self.blocked,
            'blocked_by': self.blocked_by
        }
        
        
