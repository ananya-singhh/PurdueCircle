import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfileNew() { 

  

  const currentUser = JSON.parse(localStorage.getItem('user'));
  
  console.log(currentUser)

  const username = useParams()['username'];
  const [user, setUser] = useState({})
  
  const url = window.location.pathname.split('/').pop();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/get_user?username=' + username,
    }).then( res => {
      if (res.data.data) {
        setUser(res.data)
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
      <Card.Title>{currentUser['username']}</Card.Title>
      <Row>
      <Col md={4}>0 Followers</Col>
      <Col md={{ span: 4, offset: 4 }}>{currentUser['following'].length + " Followers"}</Col>
      </Row>
      <Card.Text>
        {currentUser['bio']}
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
        <Card.Title>randomUsername</Card.Title>
        <Row>
        <Col md={4}>0 Followers</Col>
        <Col md={{ span: 4, offset: 4 }}>0 Following</Col>
        </Row>
        <Card.Text>
          randomBio
        </Card.Text>
        <div class="col-sm-12 text-center">
        <button id="follow" class="btn btn-primary btn-md center-block" Style="width: 100px; margin-right: 25px;" OnClick="follow" >Follow</button>
         <button id="blockk" class="btn btn-danger btn-md center-block" Style="width: 100px;" OnClick="block" >Block</button>
     </div>
      </Card.Body>
    </Card>
    </Container>
    );
 
}
export default ProfileNew;