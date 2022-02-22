from firebase_admin import credentials, firestore, initialize_app
from .User import User
from random import random


class db_interface(object):
    def __init__(self):
        #initialize db
        cred = credentials.Certificate("api/key.json")
        initialize_app(cred)
        db = firestore.client()
        self.users = db.collection('users')
        
    
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
        self.users.document(username).set(new_user.to_dict())
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
    def edit_user(self, user: User):
        self.users.document(user.username).set(user.to_dict())
            
    #delete user with username
    def delete_user(self, username):
        self.users.document(username).delete()
        if self.users.where(u'username', u'==', username).get():
            return None
        return username
        
    #create a new post
    def create_post(self):
        # TODO: implement
        pass
        
    #edit a post
    def edit_post(self):
        # TODO: implement
        pass
    
    #delete a post
    def delete_post(self):
        # TODO: implement
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
        
    #block a user
    def block_user(self):
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
    
    #search for a user
    def search_user(self):
        # TODO: implement
        pass
    
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
    def create_topic(self):
        # TODO: implement
        pass
    
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