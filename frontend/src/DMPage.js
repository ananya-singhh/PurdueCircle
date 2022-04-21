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


//TODO: implement posting comment functionality
function DMPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const target = useParams()['target'];
    const [messageList, setMessageList] = useState([]);
    const msgRecipient = target.split('_')[0] !== user['username'] ? target.split('_')[0] : target.split('_')[1];
  

    useEffect(() => {     
      updateList();
    }, []);

    function updateList() {
      console.log(query);
       axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/get_messages?thread_id=' + target,
      }).then( res => {
        if (res.data.data !== "No Results") {
          setMessageList(res.data)
        } 
      }).catch(error => {
        //console.error(error);
        //navigate("/404");
      })
    }

    function sendMessage() {
      if(query !== "") {
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/create_message',
          data: {
            thread_id: target,
            username: user['username'],
            recipient: msgRecipient,
            content: query,
          }
        }).then( res => {
          if (res.data.data !== "No Results") {
            setQuery("");
            updateList();
          } 
        }).catch(error => {
          //console.error(error);
          //navigate("/404");
        })
      }

    }
    function handleEnter(e) {
      if(e.charCode==13){   
        e.preventDefault();
        sendMessage();
      } 
    }

    const goBack = () => {
      navigate(-1);
    }

    return (
      <Container>
        <br></br>
      <Card>
          <Card.Header>
            <Row>
              <Col md="auto"><Button variant="primary" onClick={goBack}>Back</Button></Col>
          <Col><Form.Label className="text-center" style={{width: "93%", fontSize: "125%", fontWeight: "bold" }}>{target}</Form.Label></Col>
          </Row>
          </Card.Header>
          <Card.Body>

           {messageList && messageList.length > 0 ?
                <>
                {messageList.map((item) => (
                  <Message id={item}/>
                ))}
                </> : <div><h2 Style="margin-top: 10px;"><strong>No Messages Fucking Idiot</strong></h2></div>
                }   
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