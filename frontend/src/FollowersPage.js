import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';


function FollowersPage() { 

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [list, setList] = useState([])
    useEffect(() => {
        axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/get_following?username=' + currentUser['username'],
    }).then( res => {
    if (res.data.data !== "No Results") {
        console.log(res.data);
      setList(res.data)
    } 
    }).catch(error => {
    //console.error(error);
    //navigate("/404");
    })
    },[]);

        return (  
        <Container className="App-Topic">
        <h1 Style="margin-top: 10px;"><strong>Following</strong></h1>
        {list && list.length > 0 ? 
        <ListGroup variant="flush">
            {list.map((item) => (
                <ListGroup.Item action variant="light" onClick={() => navigate('/Profile/'+item)}>{item}</ListGroup.Item>
              ))}
        </ListGroup> : ""
        }
        </Container>
        );
}
export default FollowersPage;
