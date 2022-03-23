import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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





    
    function CreatePost() {
        /*const [checked, setChecked] = useState(false);
        const [commentsVisible, setCommentsVisible] = useState(false);
        const handleUnlike = (e) => {
            console.log("unliked");
            setChecked(!checked);
        }
        const handleLike = (e) => {
            console.log("liked");
            setChecked(!checked);
        }
        function checkLiked() {
            return checked;
        }
        
        function checkCommentsVisible() {
            return commentsVisible;
        }
        const toggleComments = (e) => {
            setCommentsVisible(!commentsVisible);
        }*/
        return (
            <Container className="App-post" Style="margin-bottom: 10px;">
            <h1 Style="margin-top: 10px;"><strong>Create a Post</strong></h1>
            <Card className="text-left" bg="light">
            <Card.Header>
                <Card.Title>
                    <Form.Control placeholder="Enter a title for your post" />
                </Card.Title> 
                <Card.Subtitle>@sampleUser</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                Post Content
                <Form.Control placeholder="What's on your mind?" />
            </Card.Body>
            <Card.Footer>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg">Post!</Button>
                </div>
            </Card.Footer>
            </Card>
            </Container> 
      );
    
    }
    
    
export default CreatePost;