import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function SearchResults() { 
  const navigate = useNavigate();
  const [list, setList] = useState([])
  const query = useParams()['query'];
  const url = window.location.pathname.split('/').pop();
  
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/search_for_user?query=' + query,
    }).then( res => {
      if (res.data.data !== "No Results") {
        setList(res.data)
      } 
    }).catch(error => {
      //console.error(error);
      //navigate("/404");
    })
  }, [url]);
  
  if(list.length > 0) {
    console.log(list)
    return (
    <Container className="App-pfpage">
        <h1 Style="margin-top: 10px;"><strong>Search Results: </strong></h1>
        

      <ListGroup variant="flush">
        {list.map((item) => (
          <ListGroup.Item action variant="light" action onClick={() => navigate('/Profile/'+item)}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
    );
  } else return (
    <Container className="App-pfpage">
        <h1 Style="margin-top: 10px;"><strong>No Results</strong></h1>
      
    </Container>
  );
  
  
 
}
export default SearchResults;