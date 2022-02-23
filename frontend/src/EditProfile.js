import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function EditProfile() { 

    const [edit, setEdit] = useState({bio: "", image: -1, privacy: -1});
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const username = useParams()['username'];
    console.log(user['username'] + " " + username);



  return (
    <Container className="App-pfpage">
    <Card className="text-center" bg="light" style={{ width: '18rem' }}>
    <Card.Body>
    <Form>

    <Form.Label>{user['username']}</Form.Label>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Edit Email:</Form.Label>
      <Form.Control type="email" placeholder="Enter an email" value={user['email']}/>
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Edit Bio:</Form.Label>
      <Form.Control type="email" placeholder="Enter a bio" value={user['bio']} />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formProfileVisibility">
      <Form.Label Style="margin-right: 12px;">Profile Visibility:</Form.Label>
      <BootstrapSwitchButton
      width={90}
    checked={false}
    onlabel='Public'
    offlabel='Private'
    onChange={(checked: boolean) => {
            this.setState({ isUserAdmin: checked })
    }}
    />
    </Form.Group>

    <div class="col-sm-12 text-center">
        <Button type= "submit" id="follow" class="btn btn-primary btn-md center-block" Style="width: 100px; margin-right: 25px;" OnClick="confirm" >Confirm</Button>
         <Button id="block" class="btn btn-danger btn-md center-block" Style="width: 100px;" onClick={() => navigate('/Profile/'+user['username'])}>Cancel</Button>
     </div>

    </Form>
    </Card.Body>
    </Card>
    </Container> 
  );

}

export default EditProfile;
