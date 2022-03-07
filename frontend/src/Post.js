import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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


import ToggleButton from 'react-bootstrap/ToggleButton';
import CommentsPage from './CommentsPage';
//TODO: Add href to comments page, make a pretty like button, add actual values for likes and comments, add functionality for liking n commenting


    
    
    function Post() {
        const [checked, setChecked] = useState(false);
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
        }
        return (
            <Container className="App-post" Style="margin-bottom: 10px;">
            <Card className="text-left" bg="light">
            <Card.Header>
                <Card.Title>Sample Title Here</Card.Title> 
                <Card.Subtitle>@sampleUser</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                I went to the store and they didn't have any fucking milk!!!!!11!1!
            
            </Card.Body>
            <Card.Footer>
                <Container>
                    <Row>
                        <Col md={{ span: 2 }}>0 Likes</Col>
                        <Col md={{ span: 3 }}>0 Comments</Col>
                        <Col md={{span: 1, offset: 3}}><Button variant="link" onClick={toggleComments}>Comments</Button></Col>
                        <Col md={{ span: 2, offset: 1}}>{(checkLiked()) ?
                        <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={false}
                        value="1"
                        onClick={handleUnlike}
                        Style="margin-right=25px;"
                        >
                        Unlike
                        </ToggleButton> :
                        <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={true}
                        value="1"
                        onClick={handleLike}
                        Style="margin-right=25px;"
                        >
                        Like
                        </ToggleButton>}</Col>
                    </Row>
                    <Row>
                        
                        {(checkCommentsVisible()) ? <CommentsPage  /> : null}
                        
                    </Row>
                </Container>
            </Card.Footer>
            </Card>
            </Container> 
      );
    
    }

    
export default Post;