import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';



function FollowingPage() { 


        return (  
        <Container className="App-Topic">
        <h1 Style="margin-top: 10px;"><strong>Followed Users</strong></h1>
        <h1 Style="margin-top: 10px;"><strong>Followed Topics</strong></h1>
        {/*<ListGroup variant="flush">
            {list.map((item) => (
                <Post id={item}/>
              ))}
        </ListGroup>*/}
        </Container>
        );
}
export default FollowingPage;
