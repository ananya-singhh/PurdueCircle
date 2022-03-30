import pytest
import requests
import json
from api.db_interface import db_interface

db = db_interface()
post_id = None

# testing if user is successfully created
@pytest.fixture
def create_user():
    db.create_user('example@gmail.com', 'TestUser1', '1234A*A*')
    user = db.get_user('TestUser1')
    assert user.username == 'TestUser1'
    assert user.email == 'example@gmail.com'
    assert user.password == '1234A*A*'
   
   
# user story 4
# doing user story 4 first so that posts can be made under this topic
def test_create_topic():
    db.create_topic("test topic")
    # pull all topics and assert if "test topic" is one of them
    assert 1 == 1
   
# user story 1
def create_post():
    db.create_post("post body", "test", 'TestUser1', 'test topic')
    post = db.get_post2('test')[0]
    print(post)
    global post_id
    post_id = db.get_post_id('test')
    assert post['title'] == 'test'
    assert post['content'] == 'post body'
    assert post['author'] == 'TestUser1'
    assert post['topic'] == 'test topic'
      
# user story 2  
def test_like_post():
    assert 1 == 1  
    
# user story 3
def comment_post():
    # print(post_id)
    db.create_comment("TestUser1", "test comment", post_id)
    comment = db.get_comments(post_id)
    print(comment)
    assert 1 == 1
    



# user story 5
def test_default_timeline():
    assert 1 == 1

# user story 6
def test_user_timeline():
    assert 1 == 1

# user story 7
def test_anonymous_posting():
    #make an anonymous post, find it, and check that the user who created it is listed as anonymous
    assert 1 == 1

# user story 8
def test_saved_posts():
    # save a post, and check to see if it appears in the list of saved posts
    assert 1 == 1

# user story 9
def test_follow_topic():
    assert db.follow_topic("test topic", "TestUser1")
    user = db.get_user("TestUser1")
    
    #follow a topic and check if that topic is in the list of followed topics
    assert 1 == 1

# user story 10
# check to see if the two posts made under the topic 
def test_topic_search():
    # not sure yet
    assert 1 == 1

# user story 11
# edit a post's description, then return description and check if it has been changed
def edit_post():
    assert db.edit_post(post_id, {'content': "new and improved test body"})
    post = db.get_post(post_id)
    post['content'] 
    
    
    assert 1 == 1

# user story 12
def test_delete_post():
    db.delete_post(post_id)
    
    
    
    # delete post and confirm that it no longer exists by trying to pull it from the database
    assert 1 == 1

# user story 13
def test_topic_page():
    db.get_timeline_topic()
    assert 1 == 1

# user story 14
def test_unfollow_topic():
    # unfollow topic and check that it is no longer in the followed topics list.
    assert 1 == 1

# user story 15
def test_user_posts():
    # make another post and check to see if both posts appear on the user's post page
    assert 1 == 1

   
create_post()
comment_post()
print(post_id)
edit_post()

# def test_valid_login():
#     url = "https://reqres.in/api/login/"
#     data = {'email': 'abc@xyz.com', 'password': 'qwerty'}
#     response = requests.post(url, data=data)
#     token = json.loads(response.txt)
#     assert response.status_code == 200
#     assert token['token'] == "QpwL5tke4Pnpja7X4"