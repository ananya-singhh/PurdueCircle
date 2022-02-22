from typing import List
from .Constants import *

class User(object):
    
    def __init__(self, email: str = None, username: str = None, password: str = None, bio: str = None, profile_picture: int = 0, privacy_setting: int = 0):
        self.username = username
        self.email = email
        self.password = password
        self.bio = bio
        self.profile_picture = profile_picture
        self.privacy_setting = privacy_setting
        
