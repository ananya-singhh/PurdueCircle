import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



    function CreatePost() {
        const topic = useParams()['topic']
        const user = JSON.parse(localStorage.getItem('user'));
        const [content, setContent] = useState({content: "", title: ""});
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
              }
            }).then( res => {
              navigate('/homepage/')
                
            }).catch(error => {
              console.log(error);
              //navigate("/404");
            })
          }



        return (
            <Container className="App-post" Style="margin-bottom: 10px;">
            <h1 Style="margin-top: 10px;"><strong>Create a Post</strong></h1>
            <Card className="text-left" bg="light">
            <Card.Header>
                <Card.Title>
                    <Form.Control placeholder="Enter a title for your post" onChange = {e => setContent({...content, title: e.target.value})} value={content.title} />
                </Card.Title> 
                <Card.Subtitle>@sampleUser</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                Post Content
                <Form.Control as="textarea" placeholder="What's on your mind?" onChange = {e => setContent({...content, content: e.target.value})} value={content.content} />
            </Card.Body>
            <Card.Footer>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={ () => create()}>Post!</Button>
                </div>
            </Card.Footer>
            </Card>
            <Button variant="link" size="sm" href="/homepage">Return to homepage</Button>
            </Container> 
      );
    
    }
    
    
export default CreatePost;