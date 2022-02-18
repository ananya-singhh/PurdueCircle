from typing import List
import Constants

class User(object):
    
    def __init__(self, email: str = None, username: str = None, password: str = None, bio: str = None, profile_picture = None, privacy_setting: Constants.PrivacySetting = None):
        self.username = username
        self.email = email
        self.password = password
        self.bio = bio
        self.profile_picture = profile_picture
        self.privacy_setting = privacy_setting
        
    
    def to_dict(self):
        return {
            'email': self.email,
            'username': self.username,
            'bio': self.bio,
            'password': self.password,
            
        }
        
        