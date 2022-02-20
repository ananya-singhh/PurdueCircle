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
    user = db.get_user(request_data['username'], request_data['password'])
    if not user:
            return {'data': 'Failed'}
    print(user.to_dict())
    return user.to_dict()

if __name__ == "__main__":
    app.run(debug=True)