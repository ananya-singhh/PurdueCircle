import { React } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';


function SearchResults() { 
  const navigate = useNavigate();
  const list = ["conner", "conner2", "die"];
  return (
    <Container className="App-pfpage">
        <h1 Style="margin-top: 10px;"><strong>Search Results:</strong></h1>

      <ListGroup variant="flush">
        {list.map((item) => (
          <ListGroup.Item action variant="light" action onClick={() => navigate('/Profile/'+item)}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
    );
 
}
export default SearchResults;