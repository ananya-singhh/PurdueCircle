import { React } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';

function ProfileNew() { 

  

    const user = JSON.parse(localStorage.getItem('user'));
    const username = useParams()['username'];
    console.log(user['username'] + " " + username);

  if(username === user['username']) {

  return (
  <Container className="App-pfpage">
  <Card className="text-center" bg="light" style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{user['username']}</Card.Title>
      <Row>
      <Col md={4}>0 Followers</Col>
      <Col md={{ span: 4, offset: 4 }}>0 Following</Col>
      </Row>
      <Card.Text>
        {user['bio']}
      </Card.Text>
      <Button variant="primary">Edit Profile</Button>
    </Card.Body>
  </Card>
  </Container>
  );

  }

  

  return (
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