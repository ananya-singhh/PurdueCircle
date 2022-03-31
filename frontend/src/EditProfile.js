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
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";



function EditProfile() { 
    const user = JSON.parse(localStorage.getItem('user'));

    const pics = [pic1, pic2, pic3, pic4, pic5, pic6];

    const [edit, setEdit] = useState({bio: user['bio'], image: user['profile_picture'], privacy: user['privacy_setting']});
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    function changePfp(arg) {
      console.log("clicked");
      var elem = document.getElementById('pfp');
      if(elem !== null && elem !== 'undefined' && elem.src !== null && elem.src !== 'undefined' && arg !== null) {
        document.getElementById("pfp").src = arg;
        //console.log(pics.indexOf(arg));
        //setEdit({...edit, profile_picture: pics.indexOf(arg)});
        edit.image = pics.indexOf(arg);
      }
    }
    
    function saveChanges() {
      console.log("made it to save changes ig")
      console.log(edit.image)
      axios({
        method: 'put',
        url: 'http://127.0.0.1:5000/edit_user',
        data: {
          username: user['username'], 
          bio: edit.bio,
          profile_picture: edit.image,
          privacy_setting: edit.privacy,
        }
      }).then( res => {
        
        console.log(res);
        user['bio'] = edit.bio
        user['profile_picture'] = edit.image
        user['privacy_setting'] = edit.privacy
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/Profile/'+ user['username'])
          
      }).catch(error => {
        console.log(error);
        //navigate("/404");
      })
    }
    
    const handleYes = () => { //TODO: DELETE THE ACC
      setShow(false);
      axios({
        method: 'delete',
        url: 'http://127.0.0.1:5000/delete_user?username=' + user['username'],
      }).then( res => {
        localStorage.removeItem('user')
        navigate('/')
          
      }).catch(error => {
        console.log(error);
        //navigate("/404");
      })
    }
    const handleNo = () => {
      setShow(false);
    }
    const areYouSure = () => setShow(true);
      


  return (
    <Container className="App-pfpage">
    <Card className="text-center" bg="light" style={{ width: '18rem' }}>
    <Card.Body>

    <FigureImage as={Image} width={125} height={125} src={pics[user['profile_picture']]} roundedCircle={true} id="pfp" alt="Card image"/> 
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


  
    <Form.Group className="mb-3">
      <Form.Label>Edit Bio:</Form.Label>
      <Form.Control type="email" placeholder="Enter a bio" onChange = {e => setEdit({...edit, bio: e.target.value})} value={edit.bio}/>
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
        <Button id="follow" class="btn btn-primary btn-md center-block" Style="width: 100px; margin-right: 25px;" onClick={ () => saveChanges()} >Confirm</Button>
         <Button id="block" variant="warning" class="btn btn-warning btn-md center-block" Style="width: 100px;" onClick={() => navigate('/Profile/'+user['username'])}>Cancel</Button>
         <Button id="del" variant="danger" class="btn btn-danger btn-md center-block" Style="width: 100px; margin-top: 25px;" onClick={areYouSure}>Delete Account</Button>
         <Modal show={show} onHide={handleNo}>
					<Modal.Header closeButton>
					  <Modal.Title>Delete Account</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to delete your account?</Modal.Body>
					<Modal.Footer>
					  <Button variant="secondary" onClick={handleNo}>
						No
					  </Button>
					  <Button variant="primary" onClick={handleYes}>
						Yes
					  </Button>
					</Modal.Footer>
					</Modal>
     </div>

    </Form>
    </Card.Body>
    </Card>
    </Container> 
  );

}

export default EditProfile;