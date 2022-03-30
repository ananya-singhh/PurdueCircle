//import React, { Component } from 'react';
//import Container from 'react-bootstrap/Container';
import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
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
        const navigate = useNavigate();

        const user = JSON.parse(localStorage.getItem('user'));
        const [list, setList] = useState([]);
        useEffect(() => {
                if (!user) navigate('/homepage/');
                axios({
                  method: 'get',
                  url: 'http://127.0.0.1:5000/get_saved_posts?username=' + user['username'],
                }).then( res => {
                  if (res.data.data !== "No Results") {
                    setList(res.data)
                  } 
                }).catch(error => {
                  //console.error(error);
                  //navigate("/404");
                })
              }, []);

        return (
        <Container className="App-pfpage">
        <h1 Style="margin-top: 10px;"><strong>Saved Posts</strong></h1>
        {list && list.length > 0 ?
        list.map((item) => (
                <Post id={item}/>
              )) : <h1 Style="margin-top: 10px;"><strong>No Saved Posts</strong></h1>
        }
        </Container>);
}
 
export default SavedPosts;