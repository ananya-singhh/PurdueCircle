import React from 'react';
import Container from 'react-bootstrap/Container';
import Post from './Post';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Main() { 
 
  return (
  <Container className="App-main">
  <p>Main</p>
  <Row>
  <Col xs={10}>
    <Post />
    <Post />
    <Post />
  </Col>
  <Col>
  <Button variant="primary" href="/CreatePost">Create a Post</Button>
  </Col>
  </Row>
  </Container>
  );

 
}
export default Main;