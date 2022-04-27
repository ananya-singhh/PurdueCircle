import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Message from './Message';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DMList = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const [threadsList, setThreadsList] = useState([]);

    useEffect(() => {
        axios({
          method: 'get',
          url: 'http://127.0.0.1:5000/get_threads?username=' + user['username'],
        }).then( res => {
          if (res.data.data !== "No Results") {
            console.log(res.data);
            setThreadsList(res.data);
          } 
        }).catch(error => {
          //console.error(error);
          //navigate("/404");
        })
      },[]);

    return(
        <Container>
            <br></br>
        <Card>
            <Card.Header>
                <Button variant="primary" style={{float: "right"}} onClick={(e) => navigate(-1)}>Back</Button>
                <h1>My Messages</h1>
            </Card.Header>
            <Card.Body>
                { threadsList && threadsList.length > 0 ?
                <ListGroup variant="flush">
                <h1 Style="margin-top: 10px;"><strong>Users:</strong></h1>
                {threadsList.map((item) => (
                <ListGroup.Item action variant="light" onClick={() => navigate('/Profile/DMPage/'+user['username']+'/'+(item.split('_')[0] !== user['username'] ? item.split('_')[0] : item.split('_')[1]))}>{item.split('_')[0] !== user['username'] ? item.split('_')[0] : item.split('_')[1]}</ListGroup.Item>
                ))}
                </ListGroup> : <div><h2 Style="margin-top: 10px;"><strong>No Message Threads</strong></h2><h4>Head to a user's profile to start a thread.</h4></div>
                }
            </Card.Body>
        </Card>
        </Container>
    );
}

export default DMList;