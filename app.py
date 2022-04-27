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
    print(request_data)
    created_post = db.create_post(request_data['content'], request_data['title'], request_data['username'], request_data['topic'], request_data['anonymous'], request_data['image'], request_data['link'])
    return to_dict(created_post)
    
@app.route('/edit_post', methods=['PUT'])
def edit_post():
    request_data = request.get_json()
    db.edit_post(request_data['id'], {'content': request_data['content']})
    return {"uhh":"idk"}
    
@app.route('/create_topic', methods=['POST'])
def create_topic(): # returns exists if topic exists
    request_data  = request.get_json()
    topic_name = request_data['name']
    if db.create_topic(topic_name):
        return {'data': topic_name}
    else: 
        return {'data': 'exists'}
        
@app.route('/follow_topic', methods=['PUT'])
def follow_topic():
    request_data = request.get_json()
    username = request_data['username']
    topic_name = request_data['topic_name']
    db.follow_topic(topic_name, username)
    return {'username':username, 'topic_name':topic_name}
    
@app.route('/unfollow_topic', methods=['PUT'])
def unfollow_topic():
    request_data = request.get_json()
    username = request_data['username']
    topic_name = request_data['topic_name']
    db.unfollow_topic(topic_name, username)
    return {'username':username, 'topic_name':topic_name}
        
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
    
    # if (request.args['topic']):
        # return json.dumps(db.get_timeline_topic(request.args['topic']))
    # if (request.args['user']):
        # return json.dumps(db.get_timeline_user(request.args['user']))
    return json.dumps(db.get_timeline())

@app.route('/get_timeline_user', methods=['GET'])
def get_timeline_user(): 
    print("")   
    return json.dumps(db.get_timeline_user(request.args['user']))

@app.route('/get_timeline_topic', methods=['GET'])
def get_timeline_topic():
    print("")
    return json.dumps(db.get_timeline_topic(request.args['topic'], request.args['user']))

# get_userline
@app.route('/get_userline', methods=['GET'])
def get_userline():
    print('I am here')
    is_self = request.args['is_self'] == 1
    return json.dumps(db.get_userline(request.args['user'], is_self))

@app.route('/search_for_topic', methods=['GET'])
def search_for_topic():
    query = request.args['query']
    
    list = db.search_topic(query)
    if not list:
        return {'data': 'No Results'}
    return json.dumps(list)
  
@app.route('/get_post', methods=['GET'])
def get_post():
    id = request.args['id']
    dict = db.get_post(id)
    return dict


@app.route('/delete_post', methods=['DELETE'])
def delete_post():
    id = request.args['id']
    res = db.delete_post(id)
    if not res:
        return {'data': 'Failed to delete post'}
    return id #else returns the username

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
    
@app.route('/get_comment', methods=['GET'])
def get_comment():
    comment = db.get_comment(request.args['id'])
    return comment
    
@app.route('/get_comments', methods=['GET'])
def get_comments():
    comments = db.get_comments(request.args['post_id'])
    return json.dumps(comments)
    
@app.route('/save_post', methods=['PUT'])
def save_post():
    request_data = request.get_json()
    username = request_data['username']
    post_id = request_data['post_id']
    db.save_post(username, post_id)
    return {'username':username, 'post_id':post_id} #else returns the username
    
@app.route('/unsave_post', methods=['PUT'])
def unsave_post():
    request_data = request.get_json()
    username = request_data['username']
    post_id = request_data['post_id']
    db.unsave_post(username, post_id)
    return {'username':username, 'post_id':post_id} #else returns the username
    
@app.route('/like_post', methods=['PUT'])
def like_post():
    request_data = request.get_json()
    username = request_data['username']
    post_id = request_data['post_id']
    db.like_post(username, post_id)
    return {'username':username, 'post_id':post_id} #else returns the username
    
@app.route('/unlike_post', methods=['PUT'])
def unlike_post():
    request_data = request.get_json()
    username = request_data['username']
    post_id = request_data['post_id']
    db.unlike_post(username, post_id)
    return {'username':username, 'post_id':post_id} #else return

@app.route('/get_topic', methods=['GET'])
def get_topic():
    ret = db.get_topic(request.args['name'])
    if ret:
        return ret
    else:
        return {"data" : "failed"}
    
@app.route('/get_saved_posts', methods=['GET'])
def get_saved_posts():
    ret = db.saved_timeline(request.args['username'])
    if ret:
        return json.dumps(ret)
    else:
        return {"data" : "failed"}


@app.route('/get_followers', methods=['GET'])
def get_followers():
    ret = db.get_followers(request.args['username'])
    if ret:
        return json.dumps(ret)
    else:
        return {"data" : "failed"}

@app.route('/create_message', methods=['POST'])
def create_message():
    request_data = request.get_json()
    print(request_data)
    try:
        thread_id = request_data['thread_id']
    except:
        thread_id = None
    created_message = db.create_message(request_data['username'], request_data['recipient'], request_data['content'], thread_id)
    return created_message

@app.route('/get_threads', methods=['GET'])
def get_threads():
    ret = db.get_threads(request.args['username'])
    if ret: return json.dumps(ret)
    else: return {'data': 'failed'}

@app.route('/get_thread', methods=['GET'])
def get_thread():
    try:
        thread_id = request.args['thread_id']
    except:
        thread_id = None
    try:
        user1 = request.args['user1']
        user2 = request.args['user2']
    except:
        user1 = None
        user2 = None
    ret = db.get_thread(user1, user2, thread_id)
    return ret

@app.route('/get_messages', methods=['GET'])
def get_messages():
    return json.dumps(db.get_messages(request.args['thread_id']))

@app.route('/get_message', methods=['GET'])
def get_message():
    ret = db.get_message(request.args['id'])
    return ret

@app.route('/get_user_following', methods=['GET'])
def get_user_following():
    ret = db.get_user_following(request.args['username'])
    if ret:
        return json.dumps(ret)
    else:
        return {"data" : "failed"}   

@app.route('/get_topic_following', methods=['GET'])
def get_topic_following():
    ret = db.get_topic_following(request.args['username'])
    if ret:
        return json.dumps(ret)
    else:
        return {"data" : "failed"}  
    
# @app.route('/realtime_update', methods=['GET'])
# def realtime_update():
#     return json.dumps(db.update_thread(request.args['thread_id']))


@app.route('/get_interactions', methods=['GET'])
def get_interactions():
    ret = db.get_interactions(request.args['username'])
    return {'interactions': ret}

if __name__ == "__main__":
    app.run(debug=True)
