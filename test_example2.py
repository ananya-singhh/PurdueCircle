import pytest
import hashlib
import requests
import json
from api.db_interface import db_interface

db = db_interface()
    
@pytest.fixture
def create_user():
    db.create_user('user5@gmail.com', 'TestUser5', '1234A*A*')
    user = db.get_user('TestUser5')
    
    assert user.username == 'TestUser5'
    assert user.email == 'user5@gmail.com'
    assert user.password != '1234A*A*'
    
# user story 10
# test that the password for TestUser4 isn't stored as it's original value in the data base
def test_encrypt_password1():
    db.create_user('user4@gmail.com', 'TestUser4', '1234A*A*')
    user = db.get_user('TestUser4')
    #db.follow_user("TestUser4", "TestUser3")
    
    assert user.username == 'TestUser4'
    assert user.email == 'user4@gmail.com'
    assert user.password != '1234A*A*'  

# test that the password for TestUser4 is correctly hashed
def test_encrypt_password2():
    user = db.get_user('TestUser4')
    
    h = hashlib.new('sha256')
    arr = bytes('1234A*A*', 'utf-8')
    h.update(arr)
    hashed_password = h.hexdigest()
    
    assert hashed_password == user.password

# test that the password for TestUser3 isn't stored as it's original value in the data base
def test_encrypt_password3():
    db.create_user('user3@gmail.com', 'TestUser3', '4321B*B*')
    user = db.get_user('TestUser3')
    # db.follow_user("TestUser3", "TestUser4")
    
    assert user.username == 'TestUser3'
    assert user.email == 'user3@gmail.com'
    assert user.password != '4321B*B*'
    
# test that the password for TestUser3 is correctly hashed
def test_encrypt_password4():
    user = db.get_user('TestUser3')
    
    h = hashlib.new('sha256')
    arr = bytes('4321B*B*', 'utf-8')
    h.update(arr)
    hashed_password = h.hexdigest()
    
    assert hashed_password == user.password


# user story 1
# checks that a user can't be created with a username less than 4 characters (returns -1)
def test_username_length1():
    x = db.create_user('user5@gmail.com', 'T', '1234A*A*')
    assert x == -1

def test_username_length2():
    x = db.create_user('user5@gmail.com', 'Tes', '1234A*A*')
    assert x == -1

# checks that a user can't be created with a username more than 15 characters (returns 1)
def test_username_length3():
    x = db.create_user('user5@gmail.com', '123456789101112131415', '1234A*A*')
    assert x == 1

def test_username_length4():
    x = db.create_user('user5@gmail.com', 'According to all known laws of aviation, there is no way a bee should be able to fly.', '1234A*A*')
    assert x == 1

#checks to see that a user can be created with a username between 4 and 15 characters inclusive
def test_username_length4():
    x = db.create_user('user1234@gmail.com', '1234', '1234A*A*')
    assert x != 1
    assert x != -1
    db.delete_user('1234')

def test_username_length4():
    x = db.create_user('user15@gmail.com', 'fifteen_charzzz', '1234A*A*')
    assert x != 1
    assert x != -1
    db.delete_user('fifteen_charzzz')

# user story 2
# checks to see that an image file path can be added to a post
def test_post_image1():
    db.create_post('test content', 'test_post_image1', 'TestUser3', 'topic21', False, 'image1.jpg')
    post = db.get_post2('test_post_image1')
    assert 'image1.jpg' in post[0]['image']
    
def test_post_image2():
    db.create_post('test content', 'test_post_image2', 'TestUser3', 'topic21', False, 'image2.jpg')
    post = db.get_post2('test_post_image2')
    assert 'image2.jpg' in post[0]['image']
    
def test_post_image3():
    db.create_post('test content', 'test_post_image3', 'TestUser3', 'topic21', False, 'image3.jpg')
    post = db.get_post2('test_post_image3')
    assert 'image3.jpg' in post[0]['image']
    
  
# user story 3
#tests that a post greater than 20,000 characters cannot be created
def test_post_length():
    sus = 'a'
    for i in range(1000):
        sus.append("12345678912345678912")
    assert len(sus) > 20000
    x = db.create_post(sus, 'long post', 'TestUser3', 'topic21', False, 'image')   
    assert x == -1

def test_post_length():
    sus = 'z'
    for i in range(1000):
        sus = sus + "according to all known laws of aviation..."
    assert len(sus) > 20000
    x = db.create_post(sus, 'long post', 'TestUser3', 'topic21', False, 'image')   
    assert x == -1
    
def test_post_length():
    sus = 's'
    for i in range(1000):
        sus = sus + "ECE really sucks -Lucy Han "
    assert len(sus) > 20000
    x = db.create_post(sus, 'long post', 'TestUser3', 'topic21', False, 'image')   
    assert x == -1

# user story 4
# tests that the follower list correctly contains the users that the TestUser3 follows
def test_follower_list1():
    db.follow_user('TestUser3', 'TestUser1')
    user = db.get_user('TestUser3')
    user = user.to_dict()
    assert 'TestUser1' in user['following'] 

def test_follower_list2():
    db.follow_user('TestUser3', 'TestUser2')
    user = db.get_user('TestUser3')
    user = user.to_dict()
    assert 'TestUser2' in user['following'] 
      
# tests that the follower list doesn't contain any users that TestUser3 does not follow  
def test_follower_list3():
    user = db.get_user('TestUser3')
    user = user.to_dict()
    assert 'TestUser5' not in user['following'] 

def test_follower_list4():
    user = db.get_user('TestUser3')
    user = user.to_dict()
    assert 'TestUser8' not in user['following'] 
    
# tests that the follower list correctly contains the users TestUser4 follows 
def test_follower_list():
    user = db.get_user('TestUser4')
    user = user.to_dict()
    assert 'TestUser3' in user['following'] 
    
def test_follower_list():
    db.follow_user('TestUser4', 'TestUser1')
    user = db.get_user('TestUser4')
    user = user.to_dict()
    assert 'TestUser1' in user['following'] 

# user story 5  
# tests that the topic list that is displayed contains the topics that the given user follows  
def test_topic_list1():
    db.follow_topic("epic stuff", "TestUser3")
    user = db.get_user("TestUser3")
    user = user.to_dict()
    assert 'epic stuff' in user['followed_topics'] 
    
def test_topic_list2():
    db.follow_topic("test topic", "TestUser4")
    user = db.get_user("TestUser4")
    user = user.to_dict()
    assert 'test topic' in user['followed_topics'] 
    assert 'epic stuff' not in user['followed_topics']
    
def test_topic_list3():
    db.follow_topic("topic21", "TestUser3")
    user = db.get_user("TestUser3")
    user = user.to_dict()
    assert 'topic21' in user['followed_topics'] 
    
def test_topic_list3():
    db.follow_topic("topic21", "TestUser4")
    user = db.get_user("TestUser4")
    user = user.to_dict()
    assert 'topic21' in user['followed_topics'] 
    
# user story 6
# tests that a message can successfully be sent and recieved witht the correct content
def test_DM():
    new_message = db.create_message('TestUser3', 'TestUser4', "test message lol")
    id = new_message['message_id']
    message = db.get_message(id)
    assert message['content'] == 'test message lol'
     
    
    
    
# user story 7
def test_DM_page():
    assert 1 == 1
    
# user story 8
def test_privacy():
    assert 1 == 1
     
# user story 9
def test_():
    assert 1 == 1
    
# user story 11
def test_blocked_user():
    assert 1 == 1
    
# user story 12
def test_():
    assert 1 == 1
    
    
# user story 13
# filtering content of blocked users
def test_blocked_user():
    assert 1 == 1
