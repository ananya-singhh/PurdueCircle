import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import FigureImage from 'react-bootstrap/FigureImage'

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";

    function CreateTopic(props) {
            
        const navigate = useNavigate();
        const [title, setTitle] = useState("");
        
        function create() {
            axios({
              method: 'POST',
              url: 'http://127.0.0.1:5000/create_topic',
              data: {
                name: title
              }
            }).then( res => {
              
              navigate('/homepage/')
                
            }).catch(error => {
              console.log(error);
            })
          }

        return (
            <Container className="App-post" Style="margin-bottom: 10px;">
            <h1 Style="margin-top: 10px;"><strong>Create a Topic</strong></h1>
            <Card className="text-left" bg="light">
            <Card.Header>
                <Card.Title>
                    <Form.Control placeholder="Enter Topic Title" onChange = {e => setTitle(e.target.value)} value={title} />
                </Card.Title> 
            </Card.Header>
            <Card.Footer>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={ () => create()}>Create Topic!</Button>
                </div>
            </Card.Footer>
            </Card>
            <Button variant="link" size="sm" href="/homepage">Return to homepage</Button>
            </Container> 
      );
    }
export default CreateTopic;