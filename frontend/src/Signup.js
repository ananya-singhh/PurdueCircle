import React, {useState, useRef} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InlineAlert from './InlineAlert';
import Alert from 'react-bootstrap/Alert';
import PasswordChecklist from "react-password-checklist";

function Signup() { 

  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({username: "", email: "", password: "", password2: ""})
  
  const formRef = useRef(null);
  
  const [show, setShow] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const specials = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
   const handleSubmit = (event) => {
    const form = event.currentTarget;
	event.preventDefault();


	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
		alert("Enter a valid email address")
	} else if (!(specials.test(user.password)) || user.password.length < 8 || !(/[0-9]/.test(user.password)) || !(/[A-Z]/.test(user.password))) {
      alert("Password does not meet listed requirements!")
    } else if (user.password !== user.password2) {
		alert("Passwords do not match!")
	} else if (user.username.length < 4 || user.username.length > 15){
		alert("Username should be between 4 and 15 characters long!")
	} else if (user.username.length === 0 || user.password.length === 0) {
		alert("Fill in all the stuff")
	} else {
		axios({
			method: 'post',
			url: 'http://127.0.0.1:5000/create_user',
			data: {
				username: user.username,
				password: user.password,
				email: user.email,
			}
		  }).then( res => {
			  if (res.data.data) {
				  if (res.data.data === "username") {
					alert("Username is taken")
				  } else alert("Email is already in use!");
			  } else {
				  localStorage.setItem('user', JSON.stringify(res.data));
				  navigate("/homepage");
			  }
			  
		  }).catch(error => {
			  console.log(error);
			  //navigate("/404"); //do error stuff
		  })
	}	
  };
   
  
    const handleLogin = (event) => {
	  navigate('/Login');
  };
  
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
			<Form.Control required type="email" placeholder="Enter email address" onChange = {e => setUser({...user, email: e.target.value})} value={user.email} />
			<Form.Control.Feedback type="invalid">
              Please enter email address.
            </Form.Control.Feedback>
		  </Form.Group>
		  
		  <Form.Group className="mb-3" controlId="formUserName">
			<Form.Label>Username</Form.Label>
			<Form.Control required type="text" placeholder="Enter user name" onChange = {e => setUser({...user, username: e.target.value})} value={user.username}/>
			<Form.Control.Feedback type="invalid">
              Please enter username.
            </Form.Control.Feedback>
		  </Form.Group>
		  
		  <Row className="mb-3">
		  <Form.Group as={Col} controlId="formPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control required type={passwordShown ? "text" : "password"} placeholder="Password" onChange = {e => setUser({...user, password: e.target.value})} value={user.password}/>
			<Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
		  </Form.Group>
		  
		  <Form.Group as={Col} controlId="formRePassword">
			<Form.Label>Re-enter</Form.Label>
			<Form.Control required type={passwordShown ? "text" : "password"} placeholder="Password" onChange = {e => setUser({...user, password2: e.target.value})} value={user.password2}/>
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
				<PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={user.password}
				valueAgain={user.password2}
				/>
		</Form>
		</Col>
		<Col md={3} lg={4} />
		</Row>
		
		</Container>
		</>
		);
 
}
export default Signup;