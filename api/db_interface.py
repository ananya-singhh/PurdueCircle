import hashlib
from multiprocessing.dummy import Array
# from turtle import pos
from firebase_admin import credentials, firestore, initialize_app
from .User import User
from .Post import Post
from .Comment import Comment
from .MessageThread import MessageThread
from .Message import Message
from random import random
from .Helper import *
import datetime
import threading

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
        self.dms = db.collection(u'dms')
        self.messages = db.collection(u'messages')
        
    
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
        
        # hashes password before adding it to the database
        h = hashlib.new('sha256')
        arr = bytes(password, 'utf-8')
        h.update(arr)
        hashed_password = h.hexdigest()
        
        new_user = User(email, username, hashed_password, '')
        self.users.document(username).set(to_dict(new_user))
        return (new_user, None)
    
    def login_user(self, username, password):
        if not self.users.where(u'username', u"==", username).get():
            return None
        
        # hashes password and compares it to hashed password in database
        h = hashlib.new('sha256')
        arr = bytes(password, 'utf-8')
        h.update(arr)
        hashed_password = h.hexdigest()
        
        users = self.users.where(u'username', u"==", username).where(u'password', u'==', hashed_password).limit(1).stream()
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
        
        posts = user['posts']
        for post in posts:
            self.delete_post(post)
            
        posts = user['anonymous_posts']
        for post in posts:
            self.delete_post(post)
        
        comments = user['comments']
        for comment in comments:
            self.delete_comment(comment)
        
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
    def create_post(self, content, title, username, topic, anonymous, image):
        post = self.posts.document() # ref to new document
        current_date = datetime.datetime.now(tz=datetime.timezone.utc)
        new_post = Post(author=username, content=content, title=title, topic=topic, date_posted=current_date, anonymous=anonymous, image=image)
        post.set(to_dict(new_post))
        post_info = post.get()
        if anonymous:
            self.users.document(username).update({u'anonymous_posts': firestore.ArrayUnion([post_info.id])})
        else:
            self.users.document(username).update({u'posts': firestore.ArrayUnion([post_info.id])})
        return Post(username, post_info.id, topic, title, content, current_date, anonymous=anonymous, image=image)
        
    #edit a post
    def edit_post(self, id, changes: dict):
        self.posts.document(id).update(changes)
    
    #delete a post
    def delete_post(self, id):
        post = to_dict(Post(**self.get_post(id)))
        username = post['author']
        
        user = self.users.document(username)
        if post['anonymous']:
            user.update({u'anonymous_posts': firestore.ArrayRemove([id])})
        else:
            user.update({u'posts': firestore.ArrayRemove([id])})
        
        liked_by = post['liked_by']
        for liked in liked_by:
            self.users.document(liked).update({u'liked_posts': firestore.ArrayRemove([id])})
        
        saved_by = post['saved_by']
        for saved in saved_by:
            self.users.document(saved).update({u'saved_posts': firestore.ArrayRemove([id])})
        
        comments = post['comments']
        for comment in comments:
            self.delete_comment(comment)

        self.posts.document(id).delete()
    
    #get a post
    def get_post(self, id):
        post = self.posts.document(id).get()
        #print(post.to_dict())
        return post.to_dict()
    
    #get a post with its title
    def get_post2(self, title):
       posts = self.posts.where(u'title', u"==", title).limit(1).stream()
       post = next(posts,None)
       if not post:
           return None
       return post.to_dict(),
  
    #get a post's id with its title
    def get_post_id(self, title):
       posts = self.posts.where(u'title', u"==", title).limit(1).stream()
       res = []
       # posts = self.posts.where('author', '==', username).stream()
       for post in posts:
           res.append(post.id)
       return res[0]

    #create a new comment
    def create_comment(self, username, content, post_id):
        comment = self.comments.document() # ref to new document
        current_date = datetime.datetime.now(tz=datetime.timezone.utc)
        new_comment = Comment(author=username, content=content, date_posted=current_date, post_id=post_id)
        comment.set(to_dict(new_comment))
        comment_info = comment.get()
        self.posts.document(post_id).update({u'comments': firestore.ArrayUnion([comment_info.id])})
        self.users.document(username).update({u'comments': firestore.ArrayUnion([comment_info.id])})
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
            #print(comment.id)
        return res
                
    #send a message
    def create_message(self, sender, receiver, content, message_thread_id=None):
        self.create_thread(sender, receiver)
        if message_thread_id is None:
            message_thread_id = self.get_thread_id(sender, receiver)
        message = self.messages.document() # ref to new document
        current_date = datetime.datetime.now(tz=datetime.timezone.utc)
        new_message = Message(sender=sender, receiver=receiver, content=content, timestamp=current_date, message_thread_id=message_thread_id)
        message.set(to_dict(new_message))
        message_info = message.get()
        self.dms.document(message_thread_id).update({u'messages': firestore.ArrayUnion([message_info.id]), u'time_updated': current_date})
        message.update({u'message_id': message_info.id})
        new_message = to_dict(new_message)
        new_message['message_id'] = message_info.id
        return new_message
        
    #change privacy setting
    def change_privacy_setting(self):
        # TODO: implement
        pass
    
    #add a reaction
    def like_post(self, username, post_id):
        user = self.users.document(username)
        post = self.posts.document(post_id)
        user.update({u'liked_posts': firestore.ArrayUnion([post_id])})
        post.update({u'liked_by': firestore.ArrayUnion([username])})
    
    def unlike_post(self, username, post_id):
        user = self.users.document(username)
        post = self.posts.document(post_id)
        user.update({u'liked_posts': firestore.ArrayRemove([post_id])})
        post.update({u'liked_by': firestore.ArrayRemove([username])})
        
    #save a post
    def save_post(self, username, post_id):
        user = self.users.document(username)
        post = self.posts.document(post_id)
        user.update({u'saved_posts': firestore.ArrayUnion([post.id])})
        post.update({u'saved_by': firestore.ArrayUnion([username])})
    
    #unsave a post
    def unsave_post(self, username, post_id):
        user = self.users.document(username)
        post = self.posts.document(post_id)
        user.update({u'saved_posts': firestore.ArrayRemove([post.id])})
        post.update({u'saved_by': firestore.ArrayRemove([username])})
        
    def saved_timeline(self, username):
        res = []
        posts = self.posts.where(u'saved_by', u'array_contains', username).stream()
        if not posts:
            return res
        for post in posts:
            res.append(post.id)
        return res 
         
    #search for users
    def search_user(self, query):
        res = []
        end = query[0:-1]
        end += str(chr(ord(query[-1]) + 1)) # increment last char of end
        #print(f'initial: {query}    end: {end}' )
        
        users = self.users.where('username', '>=', query).where('username', '<', end).stream() # cursed query to find users that start with the query
        for user in users:
            res.append(user.to_dict()['username']) # build list of usernames to return
        #print(res)
        return res
    
    #tag post with topic
    def tag_post_with_topic(self):
        # TODO: implement
        pass


    # get list of users a user is following
    def get_following(self, username):
        res = []
        users = self.users.where('following', 'array_contains', username).stream()
        for user in users:
            res.append(user.to_dict()['username'])
        return res

    # get the default timeline with all posts, sorted by date
    def get_timeline(self):
        res = []
        posts = self.posts.stream()
        posts = sorted(posts, key=lambda x: x.to_dict()['date_posted'], reverse=True)
        for post in posts:
            res.append(post.id)
        return res
    
    # get the timeline by topic, filtering out posts by users the user has blocked
    def get_timeline_topic(self, topic, username):
        res = []
        posts = self.posts.where(u'topic', u'==', topic).stream()
        posts = sorted(posts, key=lambda x: x.to_dict()['date_posted'], reverse=True)
        for post in posts:
            if username == "x" or post.to_dict()['author'] not in self.users.document(username).get().to_dict()['blocked']:
                res.append(post.id)
        return res
    
    # given username, return all of those posts by users the user follows or of topics the user follows, filtering out posts by users the user has blocked
    def get_timeline_user(self, username):
        res = []
        user = self.users.document(username).get().to_dict()
        posts1 = None
        posts2 = None
        if len(user['following']) > 0:
            posts1 = self.posts.where(u'author', u'in', user['following']).stream()
        if len(user['followed_topics']) > 0:
            posts2 = self.posts.where(u'topic', u'in', user['followed_topics']).stream()
            
            
        if posts1: posts1 = sorted(posts1, key=lambda x: x.to_dict()['date_posted'], reverse=True)
        if posts2: posts2 = sorted(posts2, key=lambda x: x.to_dict()['date_posted'], reverse=True)
        if posts1:
            for post in posts1:
                if post.to_dict()['author'] not in self.users.document(username).get().to_dict()['blocked']:
                    if post.id not in res: res.append(post.id)
        if posts2:
            for post in posts2:
                if post.to_dict()['author'] not in self.users.document(username).get().to_dict()['blocked']:
                    if post.id not in res: res.append(post.id)
        return res

    #get userline of a user
    def get_userline(self, username, is_self):
        res = []
        if is_self:
            posts = self.posts.where('author', '==', username).stream()
        else:
            posts = self.posts.where('author', '==', username).where('anonymous', '==', False).stream()
        posts = sorted(posts, key=lambda x: x.to_dict()['date_posted'], reverse=True)
        for post in posts:
            res.append(post.id)
        #print(res)
        return res
    
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
        #print(res)
        return res
    
    def get_topic(self, name):
        topic = self.topics.document(name).get()
        if topic.exists:
            return topic.to_dict()
        else:
            return None
    
    def get_thread_id(self, username1, username2):
        usernames_sorted = sorted([username1, username2])
        return '_'.join(usernames_sorted)
    
    #create a message thread between two users
    def create_thread(self, username1, username2):
        thread_id = self.get_thread_id(username1, username2)
        usernames_sorted = sorted([username1, username2])
        dms = self.dms.document(thread_id)
        if dms.get().exists:
            return False # thread already exists
        else:
            thread = MessageThread(thread_id, usernames_sorted[0], usernames_sorted[1])
            ret = to_dict(thread)
            ret['time_updated'] = datetime.datetime.now(tz=datetime.timezone.utc)
            dms.set(ret)
            return True
    
    #get a message thread between two users
    def get_thread(self, username1=None, username2=None, thread_id=None):
        if thread_id:
            thread = self.dms.document(thread_id).get()
            if thread.exists:
                return thread.to_dict()
            else:
                return None
        else:
            thread_id = self.get_thread_id(username1, username2)
            thread = self.dms.document(thread_id).get()
            if thread.exists:
                return thread.to_dict()
            else:
                self.create_thread(username1, username2)
                return self.dms.document(thread_id).get().to_dict()

    #get message threads for a user
    def get_threads(self, username):
        res = []
        threads1 = self.dms.where(u'user1', u'==', username).stream()
        threads2 = self.dms.where(u'user2', u'==', username).stream()
        for thread in threads1:
            res.append(thread.id)
        for thread in threads2:
            res.append(thread.id)
        return res
    
    def update_thread(self, thread_id):
        callback_done = threading.Event()

    # Create a callback on_snapshot function to capture changes
        def on_snapshot(doc_snapshot, changes, read_time):
            for doc in doc_snapshot:
                print(f'Received document snapshot: {doc.id}')
            callback_done.set()
        
        ref = self.dms.document(thread_id)
        
        watch = ref.on_snapshot(on_snapshot())
        
        callback_done.wait(timeout=60)
        watch.unsubscribe()
        return ref.get().to_dict()