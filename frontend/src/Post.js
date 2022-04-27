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
      const navigate = useNavigate();
        var random = 0;
        var id = props.id; // pass id to the post, ex. <Post id={"exampleID"}/>, the id in this line will be "exampleID"
        const [postInfo, setPostInfo] = useState({});
        const currentUser = JSON.parse(localStorage.getItem('user'));

        const [saved, setSaved] = useState(false);
        const handleUnsave = (e) => {
            axios({
              method: 'put',
              url: 'http://127.0.0.1:5000/unsave_post',
              data: {
                post_id: id,
                username: currentUser['username'],
              }
            }).then( res => {
              setSaved(!saved);
              currentUser['saved_posts'].pop(id);
              localStorage.setItem('user', JSON.stringify(currentUser));
              //getPost();
            }).catch(error => {
              console.error(error);
              //navigate("/404");
            })
        }
        const handleSave = (e) => {
          axios({
            method: 'put',
            url: 'http://127.0.0.1:5000/save_post',
            data: {
              post_id: id,
              username: currentUser['username'],
            }
          }).then( res => {
            setSaved(!saved);
            currentUser['saved_posts'].push(id);
            localStorage.setItem('user', JSON.stringify(currentUser));
            //getPost();
          }).catch(error => {
            console.error(error);
            //navigate("/404");
          })
        }
        



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
                currentUser['liked_posts'].pop(id);
                localStorage.setItem('user', JSON.stringify(currentUser));
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
                currentUser['liked_posts'].push(id);
                localStorage.setItem('user', JSON.stringify(currentUser));
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
                getPost();
              }).catch(error => {
                console.error(error);
                //navigate("/404");
              })
            
        }

        function getPost() {
            axios({
                method: 'get',
                url: `http://127.0.0.1:5000/get_post?id=${id}&logged_in_user=${currentUser['username']}`,
              }).then( res => {
                setPostInfo(res.data);
                if(currentUser) {
                  setChecked(res.data['liked_by'].includes(currentUser['username']));
                  setSaved(res.data['saved_by'].includes(currentUser['username']));
                }
              }).catch(error => {
                console.error(error);
                //navigate("/404");
              })
        }
        useEffect(() => {
            getPost();
        }, []);

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
                <Card.Subtitle>{postInfo['author'] ? postInfo['anonymous'] ? "Anonymous User" : "@" + postInfo['author'] : "Loading..."} in '{postInfo['topic'] ? <a href={"/Topic/" + postInfo['topic']}>{postInfo['topic']}</a> : ""}'</Card.Subtitle>
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
                <Card.Subtitle>{postInfo['author'] && !postInfo['anonymous'] ? "@" + postInfo['author'] : "Anonymous User"} in '{postInfo['topic'] ? <a href={"/Topic/" + postInfo['topic']}>{postInfo['topic']}</a> : ""}'</Card.Subtitle>
                </Card.Header>
                }
        
            <Card.Body>
                {editMode ? 
                postInfo['content'] ? postInfo['content'] : "Loading..."
                :
                <Form.Control as="textarea" value={postInfo['content']} onChange = {e => setPostInfo({...postInfo, content: e.target.value})}/>
                }
                {postInfo['image'] ? <img src = {postInfo['image']}></img> : ""}
            
            </Card.Body>
            <Card.Footer>
                <Container>
                    <Row>
                        <Col md={{ span: 2 }}>{postInfo['liked_by'] && postInfo['liked_by'].length > 0 ? postInfo['liked_by'].length : 0} Likes</Col>

                        {currentUser ? <><Col md={{ span: 1, offset: 4 }}><Button variant="link" onClick={toggleComments}>Comments</Button></Col><Col xs={2} md={{ offset: 1 }}>{postInfo && checkLiked() ?
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
                      </ToggleButton>}</Col><Col xs={1}>{postInfo && saved ?
                        <ToggleButton
                          className="mb-2"
                          id="toggle-check"
                          type="checkbox"
                          variant="outline-primary"
                          checked={false}
                          value="1"
                          onClick={handleUnsave}
                          Style="margin-right=25px;"
                        >
                          Unsave
                        </ToggleButton> :
                        <ToggleButton
                          className="mb-2"
                          id="toggle-check"
                          type="checkbox"
                          variant="outline-primary"
                          checked={true}
                          value="1"
                          onClick={handleSave}
                          Style="margin-right=25px;"
                        >
                          Save
                        </ToggleButton>}</Col></> : <><Col><Button variant="link" onClick={toggleComments}>Comments</Button></Col><Col>Please sign in to like and save posts.</Col></>}
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