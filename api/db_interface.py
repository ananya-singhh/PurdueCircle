from hashlib import new
from multiprocessing.dummy import Array
from firebase_admin import credentials, firestore, initialize_app
from .User import User
from .Post import Post
from random import random
from .Helper import *
import datetime

class db_interface(object):
    def __init__(self):
        #initialize db
        cred = credentials.Certificate("api/key.json")
        initialize_app(cred)
        db = firestore.client()
        self.users = db.collection(u'users')
        self.posts = db.collection(u'posts')
        self.topics = db.collection(u'topics')
        
    
    #checks if user with same username or email exists
    def user_exists(self, username, email): 
        if self.users.where(u'username', u"==", username).get():
            return (True, 'username')
        if self.users.where(u'email', u'==', email).get():
            return (True, 'email')
        return (False, None)
        
        
    #create new user given info, can also add password checking for proper length etc
    def create_user(self, email, username, password):
        check = self.user_exists(username, email)
        if check[0] == True: #if username or email already exists
            return (None, check[1]) #returns 'email' or 'username' depending on which was already taken
        new_user = User(email, username, password, '')
        self.users.document(username).set(to_dict(new_user))
        return (new_user, None)
    
    def login_user(self, username, password):
        if not self.users.where(u'username', u"==", username).get():
            return None
        users = self.users.where(u'username', u"==", username).where(u'password', u'==', password).limit(1).stream()
        user = next(users,None)
        if not user:
            return None
        return User(**user.to_dict())
    
    def get_user(self, username):
        users = self.users.where(u'username', u"==", username).limit(1).stream()
        user = next(users,None)
        if not user:
            return None
        return User(**user.to_dict())

    
    #edit user with given info
    def edit_user(self, username, updates: dict):
        self.users.document(username).update(updates) # update is perfect for this
            
    #delete user with username
    def delete_user(self, username):
        user = to_dict(self.get_user(username))
                
        followers = user['followers']
        for follower in followers:
            self.users.document(follower).update({u'following': firestore.ArrayRemove([username])})
        
        following = user['following']
        for following_ in following:
            self.users.document(following_).update({u'followers': firestore.ArrayRemove([username])})
        
        blocked = user['blocked']
        for blocked_ in blocked:
            self.users.document(blocked_).update({u'blocked_by': firestore.ArrayRemove([username])})
        
        blocked_by = user['blocked_by']
        for blocked_by_ in blocked_by:
            self.users.document(blocked_by_).update({u'blocked': firestore.ArrayRemove([username])})
        
        user_to_del = self.users.document(username)
        user_to_del.delete()
        if self.users.where(u'username', u'==', username).get():
            return None
        return username
    
    def follow_user(self, username, username_to_follow):
        user = self.users.document(username)
        user_to_follow = self.users.document(username_to_follow)
        user.update({u'following': firestore.ArrayUnion([username_to_follow])})
        user_to_follow.update({u'followers': firestore.ArrayUnion([username])})
        
    def unfollow_user(self, username, username_to_unfollow):
        user = self.users.document(username)
        user_to_unfollow = self.users.document(username_to_unfollow)
        user.update({u'following': firestore.ArrayRemove([username_to_unfollow])})
        user_to_unfollow.update({u'followers': firestore.ArrayRemove([username])})
        
    #block a user
    def block_user(self, username, username_to_block):
        user = self.users.document(username)
        user_to_block = self.users.document(username_to_block)
        user.update({u'blocked': firestore.ArrayUnion([username_to_block])})
        user_to_block.update({u'blocked_by': firestore.ArrayUnion([username])})
    
        user.update({u'followers': firestore.ArrayRemove([username_to_block])})
        user.update({u'following': firestore.ArrayRemove([username_to_block])})
        user_to_block.update({u'followers': firestore.ArrayRemove([username])})
        user_to_block.update({u'following': firestore.ArrayRemove([username])})
        
    def unblock_user(self, username, username_to_unblock):
        user = self.users.document(username)
        user_to_unblock = self.users.document(username_to_unblock)
        user.update({u'blocked': firestore.ArrayRemove([username_to_unblock])})
        user_to_unblock.update({u'blocked_by': firestore.ArrayRemove([username])})
            
    #create a new post
    def create_post(self, content, title, username, topic):
        post = self.posts.document() # ref to new document
        current_date = datetime.datetime.now(tz=datetime.timezone.utc)
        post.set({'title': title, 'content': content, 'author': username, 'topic': topic, 'date_posted': current_date})
        post_info = post.get()
        return Post(username, post_info.id, topic, title, content, current_date)
        
    #edit a post
    def edit_post(self, id, changes: dict):
        self.posts.document(id).update(changes)
        return True
    
    #delete a post
    def delete_post(self, id):
        self.posts.document(id).delete()
        pass
    
    #create a new comment
    def create_comment(self):
        # TODO: implement
        pass
    
    #edit a comment
    def edit_comment(self):
        # TODO: implement
        pass
        
    #delete comment
    def delete_comment(self):
        # TODO: implement
        pass
        
    #send a message
    def send_message(self):
        # TODO: implement
        pass
        
    #change privacy setting
    def change_privacy_setting(self):
        # TODO: implement
        pass
    
    #add a reaction
    def add_reaction(self):
        # TODO: implement
        pass
    
    #save a post
    def save_post(self):
        # TODO: implement
        pass
    
    #search for users
    def search_user(self, query):
        res = []
        end = query[0:-1]
        end += str(chr(ord(query[-1]) + 1)) # increment last char of end
        print(f'initial: {query}    end: {end}' )
        
        users = self.users.where('username', '>=', query).where('username', '<', end).stream() # cursed query to find users that start with the query
        for user in users:
            res.append(user.to_dict()['username']) # build list of usernames to return
        print(res)
        return res
    
    #tag post with topic
    def tag_post_with_topic(self):
        # TODO: implement
        pass
    
    #get timeline of a user
    def get_timeline(self):
        # TODO: implement
        pass
    
    #get userline of a user
    def get_userline(self):
        # TODO: implement
        pass
    
    #create a new topic
    def create_topic(self, name):
        topic = self.topics.document(name)
        if topic.get().exists:
            return False
        else:
            topic.set({'time_created': datetime.datetime.now(tz=datetime.timezone.utc)})
            return True
    
    #search for a topic
    def search_topic(self):
        # TODO: implement
        pass
    
    #create a message thread between two users
    def create_thread(self):
        # TODO: implement
        pass
    
    #get a message thread between two users
    def get_thread(self):
        # TODO: implement
        pass
    
    #get message threads for a user
    def get_threads(self):
        # TODO: implement
        pass