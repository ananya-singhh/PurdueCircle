import React, {useState, useRef} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import InlineAlert from './InlineAlert';
import Alert from 'react-bootstrap/Alert';

function Signup() { 

  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [validated, setValidated] = useState(false);
  
  const formRef = useRef(null);
  
  const [show, setShow] = useState(false);
  
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  
   const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
	  setValidated(true);
    } else {
		    setValidated(true);
			event.preventDefault();
			setShow(true);	
			formRef.current.reset();
			setValidated(false);
	}	
  };
   
  
    const handleLogin = (event) => {
	  navigate('/');
  };

  const handleSignup = (event) => {
	navigate('/homepage');
}
  
	  return (
	    <>
        {show && <Alert variant="success" onClose={() => setShow(false)} dismissible>You have Signed up successfully!</Alert>}
		<Container className="My-main">
		<Row>
		<Col md={3} lg={4} />
		<Col md={6} lg={4}>

		<Form className="My-border" ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
		
		  <h4><center>Sign up</center></h4>
		  <br/>
		  
		  <Form.Group className="mb-3" controlId="formEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control required type="email" placeholder="Enter email address" />
			<Form.Control.Feedback type="invalid">
              Please enter email address.
            </Form.Control.Feedback>
		  </Form.Group>
		  
		  <Form.Group className="mb-3" controlId="formUserName">
			<Form.Label>Username</Form.Label>
			<Form.Control required type="text" placeholder="Enter user name" />
			<Form.Control.Feedback type="invalid">
              Please enter username.
            </Form.Control.Feedback>
		  </Form.Group>
		  
		  <Row className="mb-3">
		  <Form.Group as={Col} controlId="formPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control required type={passwordShown ? "text" : "password"} placeholder="Password" />
			<Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
		  </Form.Group>
		  
		  <Form.Group as={Col} controlId="formRePassword">
			<Form.Label>Re-enter</Form.Label>
			<Form.Control required type={passwordShown ? "text" : "password"} placeholder="Password" />
			<Form.Control.Feedback type="invalid">
              Please re-enter password.
            </Form.Control.Feedback>
		  </Form.Group>
		  </Row>
		  
		  <Form.Group className="mb-3" controlId="formShow">
			<Form.Check type="checkbox" label="Show password" onClick={togglePassword}/>
		  </Form.Group>

          <Row>
			  <Col>
				<Button type="submit">Sign up</Button>
			  </Col>
			  <Col>
				<Button variant="link" onClick={handleLogin}>Login instead</Button>
			  </Col>
		  </Row>

		</Form>
		</Col>
		<Col md={3} lg={4} />
		</Row>
		</Container>
		</>
		);
 
}
export default Signup;