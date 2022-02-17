from flask import Flask, request, jsonify, send_from_directory
from firebase_admin import credentials, firestore, initialize_app

from api.User import User
from api.db_interface import db_interface

app = Flask(__name__)

db = db_interface()

@app.route('/')
def index():
    user = User(1, 'email', 'username', 'password', 'bio stuff', None, None)
    db.users.document('1').set(user.to_dict())
    print(db.users.document('1').get().exists)
    return "this should be " 

if __name__ == "__main__":
    app.run(debug=True)