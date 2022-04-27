import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';



function SearchResults() { 
  const navigate = useNavigate();
  const [userList, setUserList] = useState([])
  const [topicList, setTopicList] = useState([])
  const query = useParams()['query'];
  const url = window.location.pathname.split('/').pop();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:5000/search_for_user?query=${query}&logged_in_user=${user['username']}`,
    }).then( res => {
      if (res.data.data !== "No Results") {
        setUserList(res.data)
      } 
    }).catch(error => {
      //console.error(error);
      //navigate("/404");
    })
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/search_for_topic?query=' + query,
    }).then( res => {
      if (res.data.data !== "No Results") {
        setTopicList(res.data)
      } 
    }).catch(error => {
      //console.error(error);
      //navigate("/404");
    })
  }, [url]);
  
  
    
    return (
    <Container className="App-pfpage">
        <h1 Style="margin-top: 10px;"><strong>Search Results: </strong></h1>
        
      <Row>
        <Col>
        { userList.length > 0 ?
      <ListGroup variant="flush">
        <h1 Style="margin-top: 10px;"><strong>Users:</strong></h1>
        {userList.map((item) => (
          <ListGroup.Item action variant="light" onClick={() => navigate('/Profile/'+item)}>{item}</ListGroup.Item>
        ))}
      </ListGroup> : <h1 Style="margin-top: 10px;"><strong>No User Results</strong></h1> 
        }
        </Col>
        <Col>
      {topicList.length > 0 ? 
      <ListGroup variant="flush">
        <h1 Style="margin-top: 10px;"><strong>Topics:</strong></h1>
        {topicList.map((item) => (
          <ListGroup.Item action variant="light" onClick={() => navigate('/Topic/'+item)}>{item}</ListGroup.Item>
        ))}
      </ListGroup> : <h1 Style="margin-top: 10px;"><strong>No Topic Results</strong></h1>
      }
        </Col>
      </Row>
    </Container>
    );
}
export default SearchResults;