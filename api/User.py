from typing import List

from sympy import postfixes
from .Constants import *

class User(object):
    
    def __init__(self, email: str = None, username: str = None, password: str = None, bio: str = None, profile_picture: int = 0, privacy_setting: int = 0, followers: List = list(), following: List = list(), blocked: List = list(), blocked_by: List = list(), saved_posts: List = list(), followed_topics: List = list(), liked_posts: List = list(), posts: List = list(), anonymous_posts: List = list(), comments: List = list()):
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
        self.saved_posts = saved_posts
        self.followed_topics = followed_topics
        self.liked_posts = liked_posts
        self.posts = posts
        self.anonymous_posts = anonymous_posts
        self.comments = comments
        
    
    def to_dict(self):
        return {
            'email': self.email,
            'username': self.username,
            'bio': self.bio,
            'privacy_setting': self.privacy_setting,
            'profile_picture': self.profile_picture,
            'followers': self.followers,
            'following': self.following,
            'blocked': self.blocked,
            'blocked_by': self.blocked_by,
            'saved_posts': self.saved_posts,
            'followed_topics': self.followed_topics,
            'liked_posts': self.liked_posts,
            'posts': self.posts,
            'anonymous_posts': self.anonymous_posts,
            'comments': self.comments
        }
        
        
