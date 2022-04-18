import pytest
import requests
import json
from api.db_interface import db_interface

db = db_interface()
post_id = None
post_id2 = None
post_id3 = None
post_id4 = None

@pytest.fixture
def create_user2():
    db.create_user('ex@gmail.com', 'TestUser2', '1234A*A*')
    user = db.get_user('TestUser2')
    assert user.username == 'TestUser2'
    assert user.email == 'ex@gmail.com'
    assert user.password == '1234A*A*'

@pytest.fixture
def create_user():
    db.create_user('example@gmail.com', 'TestUser1', '1234A*A*')
    user = db.get_user('TestUser1')
    assert user.username == 'TestUser1'
    assert user.email == 'example@gmail.com'
    assert user.password == '1234A*A*'
    db.follow_user("TestUser1", "TestUser2")

# user story 4
# doing user story 4 first so that posts can be made under this topic
# creates topic and checks if it exists by searching for its name directly
def test_create_topic1():
    db.create_topic("test topic")
    assert "test topic" in db.search_topic("test topic")
    
def test_create_topic2():
    db.create_topic("other topic")
    assert "other topic" in db.search_topic("other topic")
   
# user story 1
# creates posts with different information and then pulls them from the database  
# to check if the information is correct and in the right place
def test_create_post1():
    db.create_post("post body", "test", 'TestUser1', 'test topic', False)
    post = db.get_post2('test')[0]
    print(post)
    global post_id
    post_id = db.get_post_id('test')
    assert post['title'] == 'test'
    assert post['content'] == 'post body'
    assert post['author'] == 'TestUser1'
    assert post['topic'] == 'test topic'
    
def test_create_post2():
    db.create_post("paragraph", "test2", 'TestUser1', 'other topic', False)
    post = db.get_post2('test2')[0]
    print(post)
    global post_id2
    post_id2 = db.get_post_id('test2')
    assert post['title'] == 'test2'
    assert post['content'] == 'paragraph'
    assert post['author'] == 'TestUser1'
    assert post['topic'] == 'other topic'
    
def test_create_post3():
    db.create_post("sampletext", "test3", 'TestUser1', 'test topic', False)
    post = db.get_post2('test3')[0]
    print(post)
    global post_id3
    post_id3 = db.get_post_id('test3')
    assert post['title'] == 'test3'
    assert post['content'] == 'sampletext'
    assert post['author'] == 'TestUser1'
    assert post['topic'] == 'test topic'

def test_create_post4():
    db.create_post("example text", "test4", 'TestUser2', 'test topic', False)
    post = db.get_post2('test4')[0]
    global post_id4
    post_id4 = db.get_post_id('test4')
    assert post['title'] == 'test4'
    assert post['content'] == 'example text'
    assert post['author'] == 'TestUser2'
    assert post['topic'] == 'test topic'
    
# user story 2  
# like a post and check if the post has the user listed under 'liked_by'
def test_like_post():
    db.like_post('TestUser1', post_id)
    post = db.get_post(post_id)  
    assert 'TestUser1' in post['liked_by']

# unlike a post and check if the post no longer has the user listed under 'liked_by'
def test_unlike_post():
    db.unlike_post('TestUser1', post_id)
    post = db.get_post(post_id)  
    assert 'TestUser1' not in post['liked_by']
    
# user story 3
# checks the current number of comments of the post, then check the new number of comments 
# for that post after running create_comment in order to confirm the comment address has been added
def test_comment_post1():
    num_comments = len(db.get_comments(post_id))
    db.create_comment("TestUser1", "test comment", post_id)
    comment = db.get_comments(post_id)
    print(comment)
    assert len(comment) == num_comments + 1

def test_comment_post2():
    num_comments = len(db.get_comments(post_id2))
    db.create_comment("TestUser1", "test comment", post_id2)
    comment = db.get_comments(post_id2)
    print(comment)
    assert len(comment) == num_comments + 1
    
def test_comment_post3():
    num_comments = len(db.get_comments(post_id3))
    db.create_comment("TestUser1", "test comment", post_id3)
    comment = db.get_comments(post_id3)
    print(comment)
    assert len(comment) == num_comments + 1
    
# user story 5
# gets default timeline from the database and checks to see if it correctly contains the posts created before.
def test_default_timeline1():
    timeline = db.get_timeline()
    assert post_id in timeline
    assert post_id2 in timeline
    assert post_id3 in timeline

# gets default timeline from the database and checks to see if it correctly displays other users posts (TestUser2)
def test_default_timeline2():
    timeline = db.get_timeline()
    assert post_id4 in timeline
    
# user story 9
#follow a topic and check if that topic is in the list of followed topics
def test_follow_topic1():
    db.follow_topic("epic stuff", "TestUser1")
    user = db.get_user("TestUser1")
    user = user.to_dict()
    assert 'epic stuff' in user['followed_topics'] 
    
def test_follow_topic2():
    db.follow_topic("test topic", "TestUser1")
    user = db.get_user("TestUser1")
    user = user.to_dict()
    assert 'test topic' in user['followed_topics'] 

# user story 6
# returns the user's timeline from the database and checks to see if it has the two posts 
# that are members of the followed topic 'test topic' 
def test_user_timeline1():
    posts = db.get_timeline_user("TestUser1")
    assert post_id in posts
    assert post_id3 in posts
    
# returns the user's timeline from the database and checks to see if it has the post from
# the user they follow
def test_user_timeline2():
    posts = db.get_timeline_user("TestUser1")
    assert post_id4 in posts

# user story 7
# create an anonymous post and check if it is listed as anonymous
def test_anonymous_posting():
    db.create_post("post body", "anon", 'TestUser1', 'test topic', True)
    post = db.get_post2('anon')[0]
    assert post['anonymous']
    
# user story 8
# save a post, and check to see if it appears in the list of saved posts
def test_saved_posts1():
    db.save_post("TestUser1", post_id)
    db.get_user("TestUser1")
    user = db.get_user("TestUser1")
    user = user.to_dict()
    assert post_id in user['saved_posts']

def test_saved_posts2():
    db.save_post("TestUser1", post_id2)
    db.get_user("TestUser1")
    user = db.get_user("TestUser1")
    user = user.to_dict()
    assert post_id2 in user['saved_posts']

def test_saved_posts3():
    db.save_post("TestUser1", post_id3)
    db.get_user("TestUser1")
    user = db.get_user("TestUser1")
    user = user.to_dict()
    assert post_id3 in user['saved_posts']

# user story 10
# check to see if the two posts made under the topic 
def test_topic_search1():
    search = db.search_topic('test')
    assert 'test topic' in search
    
def test_topic_search2():
    search = db.search_topic('other')
    assert 'other topic' in search

# user story 11
# edit a post's description, then return description and check if it has been changed
def edit_post1():
    assert db.edit_post(post_id, {'content': "new and improved test body"})
    post = db.get_post(post_id)
    assert post['content'] == "new and improved test body"

def edit_post2():
    assert db.edit_post(post_id2, {'content': "different text"})
    post = db.get_post(post_id2)
    assert post['content'] == "different text"

# user story 13
# pulls 'test topic' topic page, checks if the two posts created under that topic appear,
# and checks that the third user who wasn't under that topic does not appear.
def test_topic_page1():
    topics = db.get_timeline_topic('test topic', "TestUser1")
    assert post_id in topics
    assert post_id2 not in topics
    assert post_id3 in topics

# pulls 'other topic' topic page and makes sure only the 'test2' post is listed
def test_topic_page2():
    topics = db.get_timeline_topic('other topic', "TestUser1")
    assert post_id not in topics
    assert post_id2 in topics
    assert post_id3 not in topics
    
# user story 14
# unfollow topic and check that it is no longer in the followed topics list.
def test_unfollow_topic1():
    db.unfollow_topic('epic stuff', "TestUser1")
    user = db.get_user("TestUser1")
    user = user.to_dict()
    assert 'epic stuff' not in user['followed_topics'] 

def test_unfollow_topic2():
    db.unfollow_topic('test topic', "TestUser1")
    user = db.get_user("TestUser1")
    user = user.to_dict()
    assert 'test topic' not in user['followed_topics'] 

# user story 15
# call userline of TestUser1 and makes sure all 3 of the user's posts appear in the list,
# and posts that aren't from the user are not displayed
def test_user_posts1():
    posts = db.get_userline("TestUser1", True)
    assert post_id in posts
    assert post_id2 in posts
    assert post_id3 in posts
    assert post_id4 not in posts

# calls userline of TestUser2 and makes sure only the posts they have made appear in the list.
def test_user_posts2():
    posts = db.get_userline("TestUser2", True)
    assert post_id not in posts
    assert post_id2 not in posts
    assert post_id3 not in posts
    assert post_id4 in posts
    
# user story 12
# delete post and confirm that it no longer exists by trying to pull it from the database with its post id
def test_delete_post1():
    db.delete_post(post_id)
    assert db.get_post(post_id) == None
    
def test_delete_post2():
    db.delete_post(post_id2)
    assert db.get_post(post_id2) == None

def test_delete_post3():
    db.delete_post(post_id3)
    assert db.get_post(post_id3) == None