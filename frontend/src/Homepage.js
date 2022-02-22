import { React, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Homepage() { 

    const navigate = useNavigate();


    const handleLogin = (event) => {
        navigate('/Login');
    };

    const handleSignup = (event) => {
        navigate('/signup');
    }
    
        return (
          <Container className="My-main">

          <Col md={3} lg={4} />

  
            <Row xs={1} md={2}>
            <Col md={{ span: 3, offset: 10 }}>
            <Button type="submit"  onClick={handleLogin}>
              Login
            </Button>
            </Col>
            </Row>
            <div class="row mt-3"></div>
            <Row xs={1} md={2}>
            <Col md={{ span: 3, offset: 10 }}>
            <Button type="submit"  onClick={handleSignup}>
              Sign up
            </Button>
            </Col>
            </Row>
  

          <Col md={3} lg={4} />

          </Container>
          );
   
  }
  export default Homepage;