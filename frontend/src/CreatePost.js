import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FormCheck from 'react-bootstrap/FormCheck';



    function CreatePost() {
        const topic = useParams()['topic']
        const user = JSON.parse(localStorage.getItem('user'));
        const [content, setContent] = useState({content: "", title: "", anonymous: false});
        const navigate = useNavigate();
        
        

        function create() {
            axios({
              method: 'POST',
              url: 'http://127.0.0.1:5000/create_post',
              data: {
                content: content.content,
                title: content.title,
                username: user['username'],
                topic: topic,
                anonymous: content.anonymous,
              }
            }).then( res => {
              console.log(content.anonymous);
              navigate('/homepage/')
                
            }).catch(error => {
              console.log(error);
              //navigate("/404");
            })
          }

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    
      event.preventDefault();
      event.stopPropagation();
    
    setValidated(true);
    if(content.title != "" && content.content != "") { create(); }
  };

        return (
            <Container className="App-post" Style="margin-bottom: 10px;">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1 Style="margin-top: 10px;"><strong>Create a Post</strong></h1>
            <Card className="text-left" bg="light">
            <Card.Header>
                <Card.Title>
                <InputGroup hasValidation>
                    <Form.Control required placeholder="Enter a title for your post" onChange = {e => setContent({...content, title: e.target.value})} value={content.title} />
                    <Form.Control.Feedback type="invalid">
                      Please give your post a title.
                    </Form.Control.Feedback>
                    </InputGroup>
                </Card.Title> 
                <Card.Subtitle>@{user['username']}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                Post Content
                <InputGroup hasValidation>
                <Form.Control aria-describedby="inputGroupPrepend" required as="textarea" placeholder="What's on your mind?" onChange = {e => setContent({...content, content: e.target.value})} value={content.content} />
                <Form.Control.Feedback type="invalid">
                  Please enter some content to post.
                </Form.Control.Feedback>
                </InputGroup>
                <br></br>
                <Form.Label>Add an Image (optional)</Form.Label>
                <Form.Control type="file" size="sm" />
            </Card.Body>
            <Card.Footer>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" type="submit">Post!</Button>
                    <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Post anonymously"
                    onChange={e => setContent({...content, anonymous: !content.anonymous})} value={content.anonymous}
                    />

                </div>
            </Card.Footer>
            </Card>
            <Button variant="link" size="sm" href="/homepage">Return to homepage</Button>

            </Form>
            </Container> 
            
      );
    
    }
    
    
export default CreatePost;


