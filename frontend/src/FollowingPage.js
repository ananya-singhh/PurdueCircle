import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Post from './Post'


function FollowingPage() { 


        return (  
        <Container className="App-Topic">
        Following
        {/*<ListGroup variant="flush">
            {list.map((item) => (
                <Post id={item}/>
              ))}
        </ListGroup>*/}
        </Container>
        );
}
export default FollowingPage;
