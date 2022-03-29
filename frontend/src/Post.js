import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Image from 'react-bootstrap/Image'
import FigureImage from 'react-bootstrap/FigureImage'

import pic1 from "./images/1.jpg";
import pic2 from "./images/2.jpg";
import pic3 from "./images/3.jpg";
import pic4 from "./images/4.jpg";
import pic5 from "./images/5.jpg";
import pic6 from "./images/6.jpg";


import ToggleButton from 'react-bootstrap/ToggleButton';
import CommentsPage from './CommentsPage';
//TODO: Add href to comments page, make a pretty like button, add actual values for likes and comments, add functionality for liking n commenting


    
    
    function Post(props) {
        var random = 0;
        var id = props.id; // pass id to the post, ex. <Post id={"exampleID"}/>, the id in this line will be "exampleID"
        const [postInfo, setPostInfo] = useState({});
        const currentUser = JSON.parse(localStorage.getItem('user'));

        const [checked, setChecked] = useState(false);
        const [commentsVisible, setCommentsVisible] = useState(false);
        const handleUnlike = (e) => {
            axios({
                method: 'put',
                url: 'http://127.0.0.1:5000/unlike_post',
                data: {
                  post_id: id,
                  username: currentUser['username'],
                }
              }).then( res => {
                setChecked(!checked);
                getPost();
              }).catch(error => {
                console.error(error);
                //navigate("/404");
              })
        }
        const handleLike = (e) => {
            axios({
                method: 'put',
                url: 'http://127.0.0.1:5000/like_post',
                data: {
                  post_id: id,
                  username: currentUser['username'],
                }
              }).then( res => {
                setChecked(!checked);
                getPost();
              }).catch(error => {
                console.error(error);
                //navigate("/404");
              })
              
        }
        function checkLiked() {
            return checked;
        }
        
        function checkCommentsVisible() {
            return commentsVisible;
        }
        const toggleComments = (e) => {
            setCommentsVisible(!commentsVisible);
        }

        const [editMode, setEditMode] = useState(true);
        const toggleEditMode = (e) => {
            setEditMode(!editMode);
        }
        const saveEdits = (e) => {
            setEditMode(!editMode);
            axios({
                method: 'put',
                url: 'http://127.0.0.1:5000/edit_post',
                data: {
                    id: id,
                    content: postInfo.content,
                }
              }).then( res => {

              }).catch(error => {
                console.error(error);
                //navigate("/404");
              })
            getPost();
        }

        function getPost() {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:5000/get_post?id=' + id,
              }).then( res => {
                setPostInfo(res.data);
              }).catch(error => {
                console.error(error);
                //navigate("/404");
              })
        }
        useEffect(() => {
            getPost();
        }, [random]);

        const [show, setShow] = useState(false);
        const handleNo = () => {
            setShow(false);
          }
          const areYouSure = () => setShow(true);

          const handleYes = () => { //TODO: DELETE THE ACC
            setShow(false);
            axios({
              method: 'delete',
              url: 'http://127.0.0.1:5000/delete_post?id=' + id,
            }).then( res => {
              window.location.reload(true);
            }).catch(error => {
              console.log(error);
              //navigate("/404");
            })
            
          }

        return (
            <Container className="App-post" Style="margin-bottom: 10px;">
            <Card className="text-left" bg="light">
            
            {postInfo['author'] && currentUser && postInfo['author'] === currentUser['username'] ?
                <Card.Header>
                <Row>
                <Col>
                <Card.Title>{postInfo['title'] ? postInfo['title'] : "Loading..."}</Card.Title> 
                <Card.Subtitle>{postInfo['author'] ? "@" + postInfo['author'] : "Loading..."}</Card.Subtitle>
                </Col>
                

                <Col md={{span: 1, offset: 3}}>
                    {editMode ? 
                    <Button variant="warning" onClick={toggleEditMode}>Edit</Button>
                    :
                    <Button onClick={saveEdits}>Save</Button> }
                </Col>
                <Col md={{ span: 2, offset: 1}}>
                    <Button variant="danger" onClick={areYouSure}>Delete</Button>
                    <Modal show={show} onHide={handleNo}>
					<Modal.Header closeButton>
					  <Modal.Title>Delete Post</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to delete this post?</Modal.Body>
					<Modal.Footer>
					  <Button variant="secondary" onClick={handleNo}>
						No
					  </Button>
					  <Button variant="primary" onClick={handleYes}>
						Yes
					  </Button>
					</Modal.Footer>
					</Modal>
                </Col>
                </Row>
                </Card.Header>
                : 
                <Card.Header>
                <Card.Title>{postInfo['title'] ? postInfo['title'] : "Loading..."}</Card.Title> 
                <Card.Subtitle>{postInfo['author'] ? "@" + postInfo['author'] : "Loading..."}</Card.Subtitle>
                </Card.Header>
                }
        
            <Card.Body>
                {editMode ? 
                postInfo['content'] ? postInfo['content'] : "Loading..."
                :
                <Form.Control as="textarea" value={postInfo['content']} onChange = {e => setPostInfo({...postInfo, content: e.target.value})}/>
                }
            
            </Card.Body>
            <Card.Footer>
                <Container>
                    <Row>
                        <Col md={{ span: 2 }}>{postInfo['liked_by'] && postInfo['liked_by'].length > 0 ? postInfo['liked_by'].length : 0} Likes</Col>
                        <Col md={{ span: 2 }}>0 Likes</Col>
                        <Col md={{span: 1, offset: 3}}><Button variant="link" onClick={toggleComments}>Comments</Button></Col>
                        <Col md={{ span: 2, offset: 1}}>{postInfo && checkLiked() ?
                        <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={false}
                        value="1"
                        onClick={handleUnlike}
                        Style="margin-right=25px;"
                        >
                        Unlike
                        </ToggleButton> :
                        <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={true}
                        value="1"
                        onClick={handleLike}
                        Style="margin-right=25px;"
                        >
                        Like
                        </ToggleButton>}</Col>
                    </Row>
                    <Row>
                        
                        {(checkCommentsVisible()) ? <CommentsPage curPostId={id} /> : null}
                    </Row>
                </Container>
            </Card.Footer>
            </Card>
            </Container> 
      );
    
    }

    
export default Post;