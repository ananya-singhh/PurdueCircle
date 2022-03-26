import { React, useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Post from './Post';

function Homepage() { 

    

    const navigate = useNavigate();

    const handleLogin = (event) => {
        navigate('/Login');
    };

    const handleSignup = (event) => {
        navigate('/signup');
    }
    // console.log(localStorage.getItem('user'))
    const [list, setList] = useState([])
    useEffect(() => {
      if (localStorage.getItem('user')) navigate('/homepage');
      axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/get_timeline',
      }).then( res => {
        if (res.data.data !== "No Results") {
          setList(res.data)
        } 
      }).catch(error => {
        //console.error(error);
        //navigate("/404");
      })
    },[]);
    

    
        return (
          <Container>
          <Row>
            

            <Col md={{ span: 3, offset: 10 }}>
            <Button type="submit"  onClick={handleLogin}>
              Login
            </Button>
            </Col>
            <div class="row mt-3"></div>
            <Col md={{ span: 3, offset: 10 }}>
            <Button type="submit"  onClick={handleSignup}>
              Sign up
            </Button>
            </Col>

            

            <Col sm={8} >     

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
  export default Homepage;