import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Image from 'react-bootstrap/Image'
import FigureImage from 'react-bootstrap/FigureImage'

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ListGroup from 'react-bootstrap/ListGroup';
import Post from './Post';


function ProfileNew() { 

  const pics = [pic1, pic2, pic3, pic4, pic5, pic6];

  const [list, setList] = useState([])
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const username = useParams()['username'];
  const [user, setUser] = useState({})
  
  const url = window.location.pathname.split('/').pop();
  

  const [checked, setChecked] = useState(false); //change to set to true or false depending on if followed
  var followingText = "Unfollow";
  if(checked) {
    followingText="Follow";
  }

  function checkFollowing() {
    return currentUser['following'].includes(user['username']);
  }

  function checkBlocking() {
    return currentUser['blocked'].includes(user['username']); // returns true if user is blocked by logged in user
  }
  

  const handleFollowing = (e) => { //you can add how to handle following/unfollowing in here
    axios({
      method: 'put',
      url: 'http://127.0.0.1:5000/follow_user',
      data: {
        username: currentUser['username'],
        username_to_follow: user['username'],
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
      url: 'http://127.0.0.1:5000/unfollow_user',
      data: {
        username: currentUser['username'],
        username_to_unfollow: user['username'],
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

  const [blocked, setBlocked] = useState(false); //change to set to true or false depending on if blocked
    var blockedText = "Unblock";
    if(blocked) {
      blockedText="Block";
    }

  const handleBlocking = (e) => { //you can add how to handle blocking/unblocking in here
		axios({
      method: 'put',
      url: 'http://127.0.0.1:5000/block_user',
      data: {
        username: currentUser['username'],
        username_to_block: user['username'],
      }
    }).then( res => {
      console.log("blocked lol")
      currentUser['blocked'].push(user['username']);
      localStorage.setItem('user', JSON.stringify(currentUser));
      setBlocked(!blocked)
    }).catch(error => {
      console.error(error);
      //navigate("/404");
    })
     // does nothing, just changes state to force reload
	}

  const handleUnblocking = (e) => {
    axios({
      method: 'put',
      url: 'http://127.0.0.1:5000/unblock_user',
      data: {
        username: currentUser['username'],
        username_to_unblock: user['username'],
    }
    }).then( res => {
      console.log("unblocked lol")
      currentUser['blocked'].pop(user['username']);
      localStorage.setItem('user', JSON.stringify(currentUser));
      setBlocked(!blocked)
    }).catch(error => {
      console.error(error);
      //navigate("/404");
    })
     // does nothing, just changes state to force reload
  }

  if(currentUser && user['blocked'] && user['blocked'].includes(currentUser['username'])) {
    alert('This User has you blocked!')
    navigate('/homepage');
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

  /*useEffect(() => {
      getUser()
    }, [url]);*/

    useEffect(() => {
      getUser()
      // if (localStorage.getItem('user')) navigate('/homepage');
      axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/get_timeline_user?user='+currentUser['username'],
      }).then( res => {
        if (res.data.data !== "No Results") {
          setList(res.data)
        } 
      }).catch(error => {
        //console.error(error);
        //navigate("/404");
      })
    },[]);

  

  

  if(currentUser && username === currentUser['username']) {

  return (
  <Container className="App-pfpage">
    <Row>
    <Col md={{ span: 6, offset: 4}}>
  <Card className="text-center" bg="light" style={{ width: '18rem' }}>
    <Card.Body>
    <FigureImage as={Image} width={125} height={125} src={pics[currentUser['profile_picture']]} roundedCircle={true} id="pfp" alt="Card image"/>
    

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
  </Col>
  </Row>
  <Row>
  <Col md={{ span: 9, offset: 1}}>
  <ListGroup variant="flush">
  {list.map((item) => (
    <Post id={item}/>
  ))}
</ListGroup>
</Col>
</Row>

  </Container>
  );

  } 
  console.log("i rendered with the blocked status of: " + checkBlocking());
  return (
    <Container className="App-pfpage">
      // others
      
    <Card className="text-center" bg="light" style={{ width: '18rem' }}>
      <Card.Body>

      <FigureImage as={Image} width={125} height={125} src={pics[user['profile_picture']]} roundedCircle={true} id="pfp" alt="Card image"/>

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
          {user && checkFollowing() && (checked || !checked) ?
        <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={false}
        value="1"
        onChange={handleUnfollowing}
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
      onClick={handleFollowing}
      Style="margin-right=25px;"
    >
      Follow
    </ToggleButton>}
      </Col>

      <Col md={{ span: 4, offset: 1 }}>
        {user && checkBlocking() && (blocked || !blocked) ? 
      <ToggleButton
        className="mb-2"
        id="toggle-block"
        type="checkbox"
        variant="outline-primary"
        checked={false}
        value="1"
        onClick={handleUnblocking}
        Style="margin-right=25px;"
        >
        Unblock
      </ToggleButton> : 
      <ToggleButton
        className="mb-2"
        id="toggle-block"
        type="checkbox"
        variant="outline-primary"
        checked={true}
        value="1"
        onClick={handleBlocking}
        Style="margin-right=25px;"
        >
        Block
      </ToggleButton>}
      </Col>
      </Row>

      </Card.Body>
    </Card>

  

    </Container>
  )
}
export default ProfileNew;