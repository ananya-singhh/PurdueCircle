from hashlib import new
from multiprocessing.dummy import Array
from turtle import pos
from firebase_admin import credentials, firestore, initialize_app
from .User import User
from .Post import Post
from .Comment import Comment
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
        self.comments = db.collection(u'comments')
        
    
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
        
        followed_topics = user['followed_topics']
        for topic in followed_topics:
            self.topics.document(topic).update({u'followed_by': firestore.ArrayRemove([username])})
        
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
    
    #get a post
    def get_post(self, id):
        post = self.posts.document(id).get()
        print(post.to_dict())
        return post.to_dict()
    
    #create a new comment
    def create_comment(self, username, content, post_id):
        comment = self.comments.document() # ref to new document
        current_date = datetime.datetime.now(tz=datetime.timezone.utc)
        comment.set({'post_id': post_id, 'content': content, 'author': username, 'date_posted': current_date})
        comment_info = comment.get()
        return Comment(username, comment_info.id, post_id, content, current_date)
    
    #edit a comment
    def edit_comment(self, id, changes: dict):
        self.comments.document(id).update(changes)
        
    #delete comment
    def delete_comment(self, id):
        self.comments.document(id).delete()
        
    # returns the comment info by comment id
    def get_comment(self, id):
        comment = self.comments.document(id).get()
        return comment.to_dict()
        
    # returns the comments by post id
    def get_comments(self, post_id):
        comments = self.comments.where(u'post_id', u'==', post_id).stream()
        res = []
        for comment in comments:
            res.append(comment.id)
        return res
                
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
    def save_post(self, username, post_id):
        user = self.users.document(username)
        post = self.posts.document(post_id)
        user.update({u'saved_posts': firestore.ArrayUnion([post.id])})
    
    #unsave a post
    def unsave_post(self, username, post_id):
        user = self.users.document(username)
        post = self.posts.document(post_id)
        user.update({u'saved_posts': firestore.ArrayRemove([post.id])})
        
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
        res = []
        posts = self.posts.stream()
        for post in posts:
            res.append(post.id)
        return res
    
    def get_timeline_topic(self, topic):
        res = []
        posts = self.posts.where('topic', '==', topic)
        for post in posts:
            res.append(post.id)
        return res
    
    #given username, return all of those users posts
    def get_timeline_user(self, username):
        res = []
        posts = self.posts.where('author', '==', username).stream()
        for post in posts:
            res.append(post.id)
        return res
    
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
            topic.set({'time_created': datetime.datetime.now(tz=datetime.timezone.utc), 'followed_by':[]})
            return True
        
    def follow_topic(self, topic_name, username):
        topic = self.topics.document(topic_name)
        user = self.users.document(username)
        if topic.get().exists:
            topic.update({u'followed_by': firestore.ArrayUnion([username])})
            user.update({u'followed_topics': firestore.ArrayUnion([topic_name])})
            return True
        else:
            return False
    
    def unfollow_topic(self, topic_name, username):
        topic = self.topics.document(topic_name)
        user = self.users.document(username)
        if topic.get().exists:
            topic.update({u'followed_by': firestore.ArrayRemove([username])})
            user.update({u'followed_topics': firestore.ArrayRemove([topic_name])})
            return True
        else:
            return False
    
    #search for a topic
    def search_topic(self, query):
        res = []
        topics = self.topics.stream() # cursed query to find topics that start with the query
        for topic in topics:
            if topic.id.startswith(query): res.append(topic.id) # build list of topic names to return
        print(res)
        return res
    
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