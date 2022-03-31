import { React, useState ,  useEffect} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Post from './Post';

function Homepage() { 

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    

    const [list, setList] = useState([])
    useEffect(() => {
            axios({
              method: 'get',
              url: 'http://127.0.0.1:5000/get_timeline_user?user=' + user['username'],
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
            <br></br>
            <h1 Style="margin-top: 5px;"><strong>My Timeline</strong></h1>
            <br></br>
          <ListGroup variant="flush">
          {list.map((item) => (
            <Post id={item}/>
          ))}
          </ListGroup>

          </Container>
          );
   
  }
  export default Homepage;