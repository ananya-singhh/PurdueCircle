import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import FigureImage from 'react-bootstrap/FigureImage'
import ToggleButton from 'react-bootstrap/ToggleButton';

import Post from "./Post"

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";


function TopicPage() { 
        const title = useParams()['name'];
        const [list, setList] = useState([])
        useEffect(() => {
                axios({
                  method: 'get',
                  url: 'http://127.0.0.1:5000/get_timeline_topic?topic='+title,
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
        <Container className="App-Topic">
        <h1 Style="margin-top: 10px;"><strong>Topic Name</strong></h1>
        <ListGroup variant="flush">
        {list.map((item) => (
          <ListGroup.Item action variant="light">{item}</ListGroup.Item>
        ))}
        </ListGroup>
        <Row>
        <Col sm={1}>
        <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={false}
        value="1"
        Style="margin-right=25px;"
      >
        Unfollow
      </ToggleButton> 
      </Col>
        <Col sm={1}>
      <ToggleButton
      className="mb-2"
      id="toggle-check"
      type="checkbox"
      variant="outline-primary"
      checked={true}
      value="1"
      Style="margin-right=25px;"
    >
      Follow
    </ToggleButton>
      </Col>
      </Row>
        </Container>
        );
}
export default TopicPage;

