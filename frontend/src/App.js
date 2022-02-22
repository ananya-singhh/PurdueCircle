import { React, Component, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Router, Route, useNavigate } from 'react-router-dom';

function App() { 

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  
   const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
	  setValidated(true);
    } else {
		    //setValidated(true);
			navigate('/homepage'); 
	}



	
  };
  
	  return (
		<Container className="Main">
		<Row>
		<Col md={3} lg={4} />
		<Col md={6} lg={4}>

		<Form className="App-border" noValidate validated={validated} onSubmit={handleSubmit}>
		  <h4><center>Login</center></h4>
		  <br/>
		  <Form.Group className="mb-3" controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control required type="email" placeholder="Enter email" />
			<Form.Control.Feedback type="invalid">
              Please enter email address.
            </Form.Control.Feedback>
		  </Form.Group>

		  <Form.Group className="mb-3" controlId="formBasicPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control required type="password" placeholder="Password" />
			<Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
		  </Form.Group>
		  
		  <Form.Group className="mb-3" controlId="formBasicCheckbox">
			<Form.Check type="checkbox" label="Check me out" />
		  </Form.Group>

          <Row>
		  <Col>
		  <Button type="submit">
			Sign in
		  </Button>
		  </Col>
		  <Col>
		  <Button variant="link">Sign up</Button>
		  </Col>
		  </Row>

		</Form>
		</Col>
		<Col md={3} lg={4} />
		</Row>
		</Container>
		);
 
}
export default App;