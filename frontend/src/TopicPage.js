import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Post from './Post'


function TopicPage() { 
  const title = useParams()['name'];
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [topic, setTopic] = useState({})
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();

  const handleCreateProfile = (event) => {
	  navigate('/createPost/' + title);
  }
  
  const handleFollowing = (e) => { //you can add how to handle following/unfollowing in here
    axios({
      method: 'put',
      url: 'http://127.0.0.1:5000/follow_topic',
      data: {
        topic_name: title,
        username: currentUser['username'],
      }
    }).then( res => {
      setFollowed(!followed)
    }).catch(error => {
      console.error(error);
      //navigate("/404");
    })
	}

  const handleUnfollowing = (e) => {
    axios({
      method: 'put',
      url: 'http://127.0.0.1:5000/unfollow_topic',
      data: {
        topic_name: title,
        username: currentUser['username'],
      }
    }).then( res => {
      setFollowed(!followed)
    }).catch(error => {
      console.error(error);
      //navigate("/404");
    })
  }  
  const [list, setList] = useState([])
  useEffect(() => {
          axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/get_timeline_topic?topic='+title + '&user=' + currentUser['username'],
          }).then( res => {
            if (res.data.data !== "No Results") {
              console.log(res.data)
              setList(res.data)
            } 
          }).catch(error => {
            //console.error(error);
            //navigate("/404");
          })
          axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/get_topic?name='+title ,
          }).then( res => {
            if (res.data.data !== "failed") {
              setTopic(res.data);
              setFollowed(res.data['followed_by'].includes(currentUser['username']));
            } 
          }).catch(error => {
            //console.error(error);
            //navigate("/404");
          })
        }, []);

        return (  
        <Container className="App-Topic">
        <h1 Style="margin-top: 10px;"><strong>{title}</strong></h1>
          <Row>
        <Col sm={1}>
        {topic && followed ?
        <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={false}
        value="1"
        onChange={() => handleUnfollowing()}
        Style="margin-right=25px;"
      >
        Unfollow
      </ToggleButton> :

      <ToggleButton
      className="mb-2"
      id="toggle-check"
      type="checkbox"
      variant="outline-primary"
      checked={true}
      value="1"
      onClick={() => handleFollowing()}
      Style="margin-right=25px;"
    >
      Follow
    </ToggleButton>}
      </Col>

      <Col sm={2}>
            <Button type="submit" onClick={handleCreateProfile}>
              Create Post
            </Button>
      </Col>
      </Row>

            <ListGroup variant="flush">
            {list.map((item) => (
                <Post id={item}/>
              ))}
        </ListGroup>
        </Container>
        );
}
export default TopicPage;

