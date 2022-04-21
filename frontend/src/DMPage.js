import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Message from './Message';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Image from 'react-bootstrap/Image'
import FigureImage from 'react-bootstrap/FigureImage'

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
//TODO: implement posting comment functionality
function DMPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const target = useParams()['target'];

    /*useEffect(() => {     CHANGE THIS TO GRAB MESSAGE LIST
      updateList();
    }, []);

    function updateList() {
      console.log(query);
      axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/search_for_user?query=' + query,
      }).then( res => {
        if (res.data.data !== "No Results") {
          setUserList(res.data)
        } 
      }).catch(error => {
        //console.error(error);
        //navigate("/404");
      })
    }*/

    function sendMessage() {
      if(query !== "") {
        console.log(query);
        setQuery("");
      }

    }
    function handleEnter(e) {
      if(e.charCode==13){   
        e.preventDefault();
        sendMessage();
      } 
    }

    return (
      <Container>
        <br></br>
      <Card>
          <Card.Header>
            <Row>
              <Col md="auto"><Button variant="primary" href={"../../" + target}>Back</Button></Col>
          <Col><Form.Label className="text-center" style={{width: "93%", fontSize: "125%", fontWeight: "bold" }}>{target}</Form.Label></Col>
          </Row>
          </Card.Header>
          <Card.Body>

          <Message sender="adam" content="HI"></Message>
          <Message sender="adam" content="JFKSDHGFSKDLRdhfjklsjldkfjdslkfjsdkljflskdjflkjdslkfjsdhflkjkjdfSJKFHSDLKjlksjfdlkjflkdjlfksdjlkfjsdlkfjdslkfFHSDJ"></Message>
          <Message sender="placeholder" content="HELLO"></Message>

          </Card.Body>
          <Card.Footer>
          <Form className="d-flex">
          <FormControl
            type="text"
            placeholder="Type your message here"
            className="me-2"
            aria-label="Search"
      onChange = {e => setQuery(e.target.value)} value={query} onKeyPress={e => handleEnter(e)}
          />
          <Button onClick={sendMessage} variant="success">Send</Button>
          </Form>
          </Card.Footer>
      </Card>
      </Container>
    );
}

export default DMPage;