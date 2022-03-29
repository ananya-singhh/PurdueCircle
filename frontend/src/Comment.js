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

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';

function Comment(props) {
    var commentId = props.commentId;
    const [commentInfo, setCommentInfo] = useState({author: "", content: ""});
    
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/get_comment?id=' + commentId,
          }).then( res => {
            setCommentInfo(res.data);
          }).catch(error => {
            console.error(error);
            //navigate("/404");
          })
    }, [commentId]);

    return (
        <Card>
            <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{commentInfo['author'] ? commentInfo['author'] : "Loading..."}</Card.Subtitle>
            <Card.Text>
            {commentInfo['content'] ? commentInfo['content'] : "Loading..."}
            </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default Comment;