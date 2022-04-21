import { React, useState ,  useEffect} from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
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

          <div className="App-Topic" style={{background: 'black'}}>
            <br></br>
            <Card.Header style={{color: 'white', background: '#212529', borderRadius: '0px'}}>
            <h1 Style="margin-top: 5px;">My Timeline</h1>
            </Card.Header>
          <Card.Body style={{background: '#0b3866'}}>
            <br></br>
          <ListGroup variant="flush">
          {list.map((item) => (
            <Post id={item}/>
          ))}
          </ListGroup>
          </Card.Body>
          
          </div>
          );
   
  }
  export default Homepage;