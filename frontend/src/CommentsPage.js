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
function CommentsPage() {
    return (
        <Container>
        
        
        <Card>
            <Card.Body>
                <Form>
                    <Card.Title>Add a Comment...</Card.Title>
                    <Form.Control placeholder="Type your comment here" Style="margin-bottom: 10px;"/>
                    <Button variant="primary" type="submit">Post</Button>
                </Form>
            <Card.Title Style="margin-top: 10px;">Comments</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item><Comment /></ListGroup.Item>
                <ListGroup.Item><Comment /></ListGroup.Item>
                <ListGroup.Item><Comment /></ListGroup.Item>
            </ListGroup>
            </Card.Body>
        </Card>
        </Container>
    );
}
export default CommentsPage;