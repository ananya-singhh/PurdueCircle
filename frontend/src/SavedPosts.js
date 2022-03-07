//import React, { Component } from 'react';
//import Container from 'react-bootstrap/Container';
import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Image from 'react-bootstrap/Image'
import FigureImage from 'react-bootstrap/FigureImage'

import Post from "./Post"

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";

function SavedPosts() {
        return (
        
        <Container className="App-pfpage">
        <h1 Style="margin-top: 10px;"><strong>Saved Posts</strong></h1>
        
        <Post />

        </Container>);
}
 
export default SavedPosts;