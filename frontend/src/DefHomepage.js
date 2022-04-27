import { React, useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Post from './Post';

function Homepage() { 

    

    const navigate = useNavigate();

    
    // console.log(localStorage.getItem('user'))
    const [list, setList] = useState([])
    useEffect(() => {
      if (localStorage.getItem('user')) navigate('/homepage');
      axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/get_timeline',
      }).then( res => {
        if (res.data.data !== "No Results") {
          setList(res.data)
        } 
      }).catch(error => {
        //console.error(error);
        //navigate("/404");
      })
    },[]);
    

    
        return (
          <div className="App-Topic" style={{background: 'black'}}>
          <br></br>
            <Card.Header style={{color: 'white', background: '#212529', borderRadius: '0px'}}>
            <h1 Style="margin-top: 5px;">Trending Posts</h1>
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