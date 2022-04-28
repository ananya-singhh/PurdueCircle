import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Comment from './Comment';
import Post from './Post';
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
function CommentsPage(props) {
    var curPostId = props.curPostId;
    const user = JSON.parse(localStorage.getItem('user'));
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    function createComment() {
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/create_comment',
          data: {
            content: content,
            username: user['username'],
            post_id: curPostId,
          }
        }).then( res => {
          getComments();
        }).catch(error => {
          console.log(error);
          //navigate("/404");
        })
        //getComments();
      }

    function getComments() {
        axios({
            method: 'get',
            url: `http://127.0.0.1:5000/get_comments?post_id=${curPostId}&logged_in_user=${user ? user['username'] : ""}`,
          }).then( res => {
            if (res.data.data !== "No Results") {
              setCommentsList(res.data)
              console.log(res.data)
            } 
          }).catch(error => {
            //console.error(error);
            //navigate("/404");
          })
    }
    const [commentsList, setCommentsList] = useState([]);
    useEffect(() => {
        getComments();
      }, []);

    return (
        <Container>
        
        
        <Card style={{borderColor: '#f0f1f2'}}>
            <Card.Body style={{background: '#f0f1f2'}}>
                <Form>
                    <Card.Title>Add a Comment...</Card.Title>
                    <Form.Control placeholder="Type your comment here" Style="margin-bottom: 10px;" onChange = {e => setContent(e.target.value)} value={content}/>
                    {user ? <Button variant="primary" onClick={ () => createComment()}>Post</Button>
                    : <Card.Subtitle>You must be signed in to comment.</Card.Subtitle>
                    }
                </Form>
            <Card.Title Style="margin-top: 10px;">Comments</Card.Title>
            <Card.Subtitle>{commentsList && commentsList.length != 1 ? commentsList.length + " Comments" : "1 Comment"} </Card.Subtitle>
            <br></br>
            {commentsList && commentsList.length > 0 ?
            <ListGroup variant="flush">
                {commentsList.map((item) => (
                <ListGroup.Item style={{background: '#f0f1f2'}}><Comment commentId={item}/></ListGroup.Item>
                ))}
            </ListGroup> : ""
            }
            </Card.Body>
        </Card>
        </Container>
    );
}
export default CommentsPage;