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
        
    def id_exists(self, id) -> bool:
        res = self.users.document(id).get()
        return res.exists
        
        
    def generate_user_id(self):
        pass
        
    
    def create_user(self, email, username, password):
        pass