import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() { 

  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({username: "", password: ""})
  
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
	event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
	  setValidated(true);
    } else {
		    //setValidated(true);
		axios({
			method: 'post',
			url: 'http://127.0.0.1:5000/login_user',
			data: {
				username: user.username,
				password: user.password,
			}
		}).then( res => {
			if (res.data.data === "Failed") {
				console.log("bad login")
				alert("Information is incorrect")
			} else {
				console.log(res);
				localStorage.setItem('user', JSON.stringify(res.data))
				navigate("/homepage");
			}
				
		}).catch(error => {
			console.log(error);
			//navigate("/404");
		})
	}	
  };
  
  const handleSignup = (event) => {
	  navigate('/signup');
  }
  
	  return (
		<Container className="My-main">
		<Row>
		<Col md={3} lg={4} />
		<Col md={6} lg={4}>

		<Form className="My-border" noValidate validated={validated} onSubmit={handleSubmit}>
		  <h4><center>Login</center></h4>
		  <br/>
		  <Form.Group className="mb-3" controlId="formUserName">
			<Form.Label>Username</Form.Label>
			<Form.Control required type="text" placeholder="Enter user name" onChange = {e => setUser({...user, username: e.target.value})} value={user.username} />
			<Form.Control.Feedback type="invalid">
              Please enter a username.
            </Form.Control.Feedback>
		  </Form.Group>

		  <Form.Group className="mb-3" controlId="formBasicPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control required type={passwordShown ? "text" : "password"} placeholder="Password" onChange = {e => setUser({...user, password: e.target.value})} value={user.password}/>
			<Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
		  </Form.Group>
		  
		  <Form.Group className="mb-3" controlId="formBasicCheckbox">
			<Form.Check type="checkbox" label="Show password" onClick={togglePassword}/>
		  </Form.Group>

          <Row>
		  <Col>
		  <Button type="submit">
			Login
		  </Button>
		  </Col>
		  <Col>
		  <Button variant="link" onClick={handleSignup}>Sign up instead</Button>
		  </Col>
		  </Row>

		</Form>
		</Col>
		<Col md={3} lg={4} />
		</Row>
		</Container>
		);
 
}
export default Login;