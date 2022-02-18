from flask import Flask, request, jsonify, send_from_directory
from firebase_admin import credentials, firestore, initialize_app

from api.User import User
from api.db_interface import db_interface

app = Flask(__name__)

db = db_interface()

@app.route('/')
def index():
    db.create_user('conner7mcc@gmail.com', 'conner', 'pass1234')
    print(db.create_user('conner7mcc@gmail.com', 'conner2', 'pass1234'))
    print(db.create_user('conner8mcc@gmail.com', 'conner', 'pass1234'))
    db.users.document(u'1').delete()
    return "this should be " 

if __name__ == "__main__":
    app.run(debug=True)