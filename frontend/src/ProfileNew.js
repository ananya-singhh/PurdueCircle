import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Image from 'react-bootstrap/Image'

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';

function ProfileNew() { 

  const pics = [pic1, pic2, pic3, pic4, pic5, pic6];

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const username = useParams()['username'];
  const [user, setUser] = useState({})
  
  const url = window.location.pathname.split('/').pop();
  

  const [checked, setChecked] = useState(false); //change to set to true or false depending on if followed
  var followingText = "Unfollow";
  if(checked) {
    followingText="Follow";
  }

  const handleFollowing = (e) => { //you can add how to handle following/unfollowing in here
		setChecked(e.currentTarget.checked);
    if(checked) {
      followingText="Follow";
    } else {
      followingText="Unfollow";
    }
	}

  const [blocked, setBlocked] = useState(false); //change to set to true or false depending on if blocked
  var blockedText = "Unblock";
  if(blocked) {
    blockedText="Block";
  }

  const handleBlocking = (e) => { //you can add how to handle blocking/unblocking in here
		setBlocked(e.currentTarget.checked);
    if(blocked) {
      blockedText="Block";
    } else {
      blockedText="Unblock";
    }
	}

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/get_user?username=' + username,
    }).then( res => {
      if (!res.data.data) {
        setUser(res.data)
        console.log(user)
      } 
    }).catch(error => {
      console.error(error);
      //navigate("/404");
    })
  }, [url]);

  if(currentUser && username === currentUser['username']) {

  return (
  <Container className="App-pfpage">
  <Card className="text-center" bg="light" style={{ width: '18rem' }}>
    <Card.Body>

    <Card.Img as={Image} src={pic1} roundedCircle={true} alt="Card image" /> 

      <Card.Title>{user ? user['username'] : "loading"}</Card.Title>
      <Row>
      <Col md={4}>{user['followers'] ? user['followers'].length + " Followers" : "Loading"}</Col>
      <Col md={{ span: 4, offset: 4 }}>{user['following'] ?user['following'].length + " Following" : "Loading"}</Col>
      </Row>
      <Card.Text>
        {user ? user['bio'] : "Loading"}
      </Card.Text>
      <Button variant="primary" href="/EditProfile">Edit Profile</Button>
    </Card.Body>
  </Card>
  </Container>
  );

  } else return (
    <Container className="App-pfpage">
    <Card className="text-center" bg="light" style={{ width: '18rem' }}>
      <Card.Body>

      <Card.Img as={Image} src={pic1} roundedCircle={true} alt="Card image" />

        <Card.Title>{user ? user['username'] : "loading"}</Card.Title>
        <Row>
        <Col md={4}>{user['followers'] ? user['followers'].length + " Followers" : "Loading"}</Col>
      <Col md={{ span: 4, offset: 4 }}>{user['following'] ?user['following'].length + " Following" : "Loading"}</Col>
        </Row>
        <Card.Text>
          {user ? user['bio'] : "Loading"}
        </Card.Text>
        <Row>
        <Col md={{ span: 4, offset: 1 }}>
        <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onChange={handleFollowing}
        Style="margin-right=25px;"
      >
        {followingText}
      </ToggleButton>
      </Col>

      <Col md={{ span: 4, offset: 1 }}>
      <ToggleButton
        className="mb-2"
        id="toggle-block"
        type="checkbox"
        variant="outline-primary"
        checked={blocked}
        value="1"
        onChange={handleBlocking}
        Style="margin-right=25px;"
      >
        {blockedText}
      </ToggleButton>
      </Col>
      </Row>

      </Card.Body>
    </Card>
    </Container>
    );
 
}
export default ProfileNew;