import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


function TopicPage() { 
  const title = useParams()['name'];
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState({})
  const username = useParams()['username'];
  const url = window.location.pathname.split('/').pop();
  const [checked, setChecked] = useState(false); //change to set to true or false depending on if followed
  function checkFollowing() {
    return currentUser['following'].includes(user['username']);
  }

  const handleFollowing = (e) => { //you can add how to handle following/unfollowing in here
    axios({
      method: 'put',
      url: 'http://127.0.0.1:5000/follow_topic',
      data: {
        topic_name: title,
        user: user['username'],
      }
    }).then( res => {
      console.log("followed lol")
      currentUser['following'].push(user['username']);
      localStorage.setItem('user', JSON.stringify(currentUser));
      getUser()
      //setChecked(!checked) // literally does nothing
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
        user: user['username'],
      }
    }).then( res => {
      console.log("unfollowed lol")
      currentUser['following'].pop(user['username']);
      localStorage.setItem('user', JSON.stringify(currentUser));
      //setChecked(!checked) // literally does nothing
      getUser()
    }).catch(error => {
      console.error(error);
      //navigate("/404");
    })
  }

  async function getUser() {
    await axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/get_user?username=' + username,
    }).then( res => {
      if (!res.data.data) {
        setUser(res.data);
        console.log(user);
      } 
    }).catch(error => {
      console.error(error);
      //navigate("/404");
    })
  }

  useEffect(() => {
      getUser()
    }, [url]);


        
        const [list, setList] = useState([])
        useEffect(() => {
                axios({
                  method: 'get',
                  url: 'http://127.0.0.1:5000/get_timeline_topic?topic='+title,
                }).then( res => {
                  if (res.data.data !== "No Results") {
                    setList(res.data)
                  } 
                }).catch(error => {
                  //console.error(error);
                  //navigate("/404");
                })
              }, []);

        return (  
        <Container className="App-Topic">
        <h1 Style="margin-top: 10px;"><strong>{title}</strong></h1>
        <ListGroup variant="flush">
        {list.map((item) => (
          <ListGroup.Item action variant="light">{item}</ListGroup.Item>
        ))}
        </ListGroup>
    
        <Col sm={1}>
        {user && checkFollowing() && (checked || !checked) ?
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
        </Container>
        );
}
export default TopicPage;

