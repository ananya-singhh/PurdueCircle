import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FigureImage from 'react-bootstrap/FigureImage'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";

function changePfp(arg) {
  console.log("clicked");
  var elem = document.getElementById('pfp');
  if(elem !== null && elem !== 'undefined' && elem.src !== null && elem.src !== 'undefined' && arg !== null) {
    document.getElementById("pfp").src = arg;
    imageToBeSaved = arg;
  }
}

function EditProfile() { 

  const pics = [pic1, pic2, pic3, pic4, pic5, pic6];

    const [edit, setEdit] = useState({bio: "", image: -1, privacy: -1});
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const username = useParams()['username'];
    console.log(user['username'] + " " + username);

    const [show, setShow] = useState(false);

    const imageToBeSaved = pic1; //to be replaced with user's image by indexing list
                                  //it will change when the user changes pfp using UI, so it can be referenced when saving changes to user data.

  return (
    <Container className="App-pfpage">
    <Card className="text-center" bg="light" style={{ width: '18rem' }}>
    <Card.Body>

    <FigureImage as={Image} width={125} height={125} src={pic1} roundedCircle={true} id="pfp" alt="Card image" /> 
    <div style={{marginTop: 10}}>
    <DropdownButton title="Change Profile Picture" id="picsbar" flip={true}>
        <ListGroup variant="flush">
          {pics.map((item) => (
          <ListGroup.Item action variant="light" onClick={() => changePfp(item)}><Dropdown.Item>
          <FigureImage
          width={50}
          height={50}
          alt="50x50"
          src={item}
          roundedCircle={true}
          />
        </Dropdown.Item>
        <Dropdown.Divider /></ListGroup.Item>
          ))}
        </ListGroup>
		</DropdownButton>
    </div>
        
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
    onChange={(checked) => {
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
