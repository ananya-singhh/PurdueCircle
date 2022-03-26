from flask import Flask, request, jsonify, send_from_directory
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS
from api.User import User
from api.db_interface import db_interface
from api.Helper import *
import json

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
    print(to_dict(user))
    return user.to_dict()

@app.route('/create_user', methods=['POST'])
def create_user():
    request_data = request.get_json()
    res = db.create_user(request_data['email'], request_data['username'], request_data['password'])
    user = res[0]
    if user == None:
        return {'data': res[1]} #returns username if user is taken or email if email is taken
    return user.to_dict() #else returns the user
    
@app.route('/get_user', methods=['GET'])
def get_user():
    user = db.get_user(request.args['username'])
    if user == None:
        return {'data': user} #returns username if user is taken or email if email is taken
    return user.to_dict() #else returns the user
    
@app.route('/edit_user', methods=['PUT'])
def edit_user():
    request_data = request.get_json()
    #print(request_data)
    copy = request_data.copy()
    copy.pop('username')
    #print(copy)
    res = db.edit_user(request_data['username'], copy)
    return {"pog": "pog"} #else returns the user
    
@app.route('/delete_user', methods=['DELETE'])
def delete_user():
    username = request.args['username']
    res = db.delete_user(username)
    if not res:
        return {'data': 'Failed to delete user'}
    return username #else returns the username
    
@app.route('/follow_user', methods=['PUT'])
def follow_user():
    request_data = request.get_json()
    username = request_data['username']
    username_to_follow = request_data['username_to_follow']
    db.follow_user(username, username_to_follow)
    return {'username':username, 'username_to_follow':username_to_follow} #else returns the username
    
@app.route('/unfollow_user', methods=['PUT'])
def unfollow_user():
    request_data = request.get_json()
    username = request_data['username']
    username_to_unfollow = request_data['username_to_unfollow']
    db.unfollow_user(username, username_to_unfollow)
    return {'username':username, 'username_to_unfollow':username_to_unfollow} #else returns the username
    
@app.route('/block_user', methods=['PUT'])
def block_user():
    request_data = request.get_json()
    username = request_data['username']
    username_to_block = request_data['username_to_block']
    db.block_user(username, username_to_block)
    return {'username':username, 'username_to_block':username_to_block} #else returns the username    
    
@app.route('/unblock_user', methods=['PUT'])
def unblock_user():
    request_data = request.get_json()
    username = request_data['username']
    username_to_unblock = request_data['username_to_unblock']
    db.unblock_user(username, username_to_unblock)
    return {'username':username, 'username_to_unfollow':username_to_unblock} #else returns the username

@app.route('/search_for_user', methods=['GET'])
def search_for_user():
    query = request.args['query']
    print(query)
    list = db.search_user(query)
    if not list:
        return {'data': 'No Results'}
    return json.dumps(list)

@app.route('/create_post', methods=['POST'])
def create_post():
    request_data = request.get_json()
    created_post = db.create_post(request_data['content'], request_data['title'], request_data['username'], request_data['topic'])
    return to_dict(created_post)

@app.route('/create_topic', methods=['POST'])
def create_topic(): # returns exists if topic exists
    request_data  = request.get_json()
    topic_name = request_data['name']
    if db.create_topic(topic_name):
        return {'data': topic_name}
    else: 
        return {'data': 'exists'}

@app.route('/get_timeline', methods=['GET'])
def get_timeline():
    """_summary_

    Returns:
        list of post ids
    
    takes request and returns correct timeline,
    if you want to get all posts with a specific topic, the request url is /get_timeline?topic="INSERT TOPIC NAME",
    if you want all posts made by a user, the request url is /get_timeline?user="*username to get posts of*"
    
    if you just request /get_timeline, it will return all posts in the db
    
    """
    
    if (request.args['topic']):
        return json.dumps(db.get_timeline_topic(request.args['topic']))
    if (request.args['user']):
        return json.dumps(db.get_timeline_user(request.args['user']))
    return json.dumps(db.get_timeline())

@app.route('/get_post', methods=['GET'])
def get_post():
    id = request.args['id']
    dict = db.get_post(id)
    return dict

@app.route('/create_comment', methods=['POST'])
def create_comment():
    request_data = request.get_json()
    created_comment = db.create_comment(request_data['username'], request_data['content'], request_data['post_id'])
    return to_dict(created_comment)

@app.route('/edit_comment', methods=['PUT'])
def edit_comment():
    request_data = request.get_json()
    db.edit_comment(request_data['id'], {'content': request_data['content']})
    return {"uhh":"idk"}
    
@app.route('/delete_comment', methods=['DELETE'])
def delete_comment():
    db.delete_comment(request.args['id'])
    return {"uhh":"idk"}
    
@app.route('/get_comments', methods=['GET'])
def get_comments():
    request_data = request.get_json()
    comments = db.get_comments(request_data['post_id'])
    return comments

if __name__ == "__main__":
    app.run(debug=True)