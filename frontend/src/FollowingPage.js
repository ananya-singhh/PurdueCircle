import React, { useState, useEffect, Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';


function FollowingPage() { 

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [userList, setUserList] = useState([])
    const [topicList, setTopicList] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/get_user_following?username=' + currentUser['username'],
        }).then( res => {
        if (res.data.data !== "No Results") {
            console.log(res.data);
            setUserList(res.data)
         } 
        }).catch(error => {
            //console.error(error);
            //navigate("/404");
        })
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/get_topic_following?username=' + currentUser['username'],
        }).then( res => {
        if (res.data.data !== "No Results") {
                console.log(res.data);
                setTopicList(res.data)
        }         
        }).catch(error => {
                //console.error(error);
                //navigate("/404");
        })
    },[]);

        return (  
        <Container className="App-Topic">
        <h1 Style="margin-top: 10px;"><strong>Users I follow</strong></h1>
        {userList && userList.length > 0 ? 
        <ListGroup variant="flush">
            {userList.map((item) => (
                <ListGroup.Item action variant="light" onClick={() => navigate('/Profile/'+item)}>{item}</ListGroup.Item>
              ))}
        </ListGroup> : <h1 Style="margin-top: 10px;"><strong>No User Results</strong></h1>
        }

        <h1 Style="margin-top: 10px;"><strong>Topics I follow</strong></h1>
        {topicList.length > 0 ? 
        <ListGroup variant="flush">
            {topicList.map((item) => (
                <ListGroup.Item action variant="light" onClick={() => navigate('/Topic/'+item)}>{item}</ListGroup.Item>
                ))}
        </ListGroup> : <h1 Style="margin-top: 10px;"><strong>No Topic Results</strong></h1>
        }
        </Container>
        );
}
export default FollowingPage;