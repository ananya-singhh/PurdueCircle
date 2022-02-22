from flask import Flask, request, jsonify, send_from_directory
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS

from api.User import User
from api.db_interface import db_interface

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
db = db_interface()


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/login_user', methods=['POST'])
def login_user():
    request_data = request.get_json()
    print(request_data)
    user = db.login_user(request_data['username'], request_data['password'])
    if not user:
            return {'data': 'Failed'}
    print(user.to_dict())
    return user.to_dict()

@app.route('/create_user', methods=['POST'])
def create_user():
    request_data = request.get_json()
    res = db.create_user(request_data['email'], request_data['username'], request_data['password'])
    user = res[0]
    if user == None:
        return {'data': res[1]} #returns username if user is taken or email if email is taken
    return user.to_dict() #else returns the user
    
@app.route('/edit_user', methods=['PUT'])
def edit_user():
    request_data = request.get_json()
    print(request_data)
    new_user = User(request_data['email'], request_data['username'], request_data['password'], request_data['bio'], request_data['profile_picture'], request_data['privacy_setting'])
    res = db.edit_user(new_user)
    return new_user.to_dict() #else returns the user
    
@app.route('/delete_user', methods=['DELETE'])
def delete_user():
    request_data = request.get_json()
    username = request_data['username']
    res = db.delete_user(username)
    if not res:
        return {'data': 'Failed to delete user'}
    return username #else returns the username
     
@app.route('/search_user', methods=['GET'])
def search_user():
    request_data = request.get_json()
    query = request_data['query']
    res = db.search_user(query)
    return {'users': res}

if __name__ == "__main__":
    app.run(debug=True)