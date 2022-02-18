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
        self.users.add(new_user.to_dict())
        return (new_user, None)
        