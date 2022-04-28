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
        var showComments = false;
        var id = useParams()['id']; // pass id to the post, ex. <Post id={"exampleID"}/>, the id in this line will be "exampleID"
        if(id==null) {
          id = props.id;
          //console.log(id);
        }else {
          showComments =true;
        }
        const [postInfo, setPostInfo] = useState({});
        const currentUser = JSON.parse(localStorage.getItem('user'));

        const [saved, setSaved] = useState(false);
        const handleUnsave = (e) => {
          e.preventDefault();
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
          e.preventDefault();
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
        const handleUnlike = (e) => {
          e.preventDefault();
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
          e.preventDefault();
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
        
        

        const [editMode, setEditMode] = useState(true);
        const toggleEditMode = (e) => {
            e.preventDefault();
            setEditMode(!editMode);
        }
        const saveEdits = (e) => {
          e.preventDefault();
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
                url: `http://127.0.0.1:5000/get_post?id=${id}&logged_in_user=${currentUser ? currentUser['username'] : ""}`,
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
        const handleNo = (e) => {
          e.preventDefault();
            setShow(false);
          }
          const areYouSure = (e) => {
            e.preventDefault();
            setShow(true);
          }

          const handleYes = (e) => { //TODO: DELETE THE ACC
            e.preventDefault();
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
            <Card className="text-left" bg="light" style={{borderColor: 'black', borderWidth: '1px', borderRadius: '5px'}}>
            
            {postInfo['author'] && currentUser && postInfo['author'] === currentUser['username'] ?
                <Card.Header style={{color: 'white', background: '#212529'}}>
                <Card.Title onClick={() => navigate("/Post/" + id)}style={{float:'left'}}>{postInfo['title'] ? postInfo['title'] : "Loading..."}</Card.Title>
                <Button variant="danger" style={{float:'right', marginLeft: '10px'}} onClick={areYouSure}>Delete</Button> 
                    {editMode ? 
                    <Button variant="warning" style={{float:'right'}} onClick={toggleEditMode}>Edit</Button>
                    :
                    <Button style={{float:'right', background: 'green'}} onClick={saveEdits}>Confirm</Button> }
                    
                    <Card.Subtitle style={{clear:'left'}}>{postInfo['author'] ? postInfo['anonymous'] ? "Anonymous User" : "@" + postInfo['author'] : "Loading..."} in '{postInfo['topic'] ? <a href={"/Topic/" + postInfo['topic']}>{postInfo['topic']}</a> : ""}'</Card.Subtitle>
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
                </Card.Header>
                : 
                <Card.Header style={{color: 'white', background: '#212529'}}>
                <Card.Title onClick={() => navigate("/Post/" + id)}>{postInfo['title'] ? postInfo['title'] : "Loading..."}</Card.Title> 
                <Card.Subtitle>{postInfo['author'] && !postInfo['anonymous'] ? "@" + postInfo['author'] : "Anonymous User"} in '{postInfo['topic'] ? <a href={"/Topic/" + postInfo['topic']}>{postInfo['topic']}</a> : ""}'</Card.Subtitle>
                </Card.Header>
                }
        
            <Card.Body>
                {editMode ? 
                postInfo['content'] ? postInfo['content'] : "Loading..."
                :
                <Form.Control as="textarea" value={postInfo['content']} onChange = {e => setPostInfo({...postInfo, content: e.target.value})}/>
                }
                {postInfo['image'] ? <><br></br><br></br><img src = {postInfo['image']}></img></> : ""}
                {postInfo['URL'] ? <><br></br><br></br>Attached URL: <a href={postInfo['URL']}>{postInfo['URL']}</a></> : <></>}
            
            </Card.Body>
            <Card.Footer>
                <Container>
                    <p style={{float: 'left', marginTop: '8px', marginRight: '12px'}}>{postInfo['liked_by'] && postInfo['liked_by'].length > 0 ? postInfo['liked_by'].length : 0} Likes</p>
                    <p style={{float: 'left', marginTop: '8px'}}>{postInfo['comments'] && postInfo['comments'].length !== 1 ? <>{postInfo['comments'].length} Comments</> : <>1 Comment</>}</p>
                        {currentUser ? <>
                        {postInfo && saved ?
                        <ToggleButton
                          className="mb-2"
                          id="toggle-check"
                          type="checkbox"
                          variant="outline-primary"
                          checked={false}
                          value="1"
                          onClick={handleUnsave}
                          style={{float: 'right', marginLeft: '10px'}}
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
                          style={{float: 'right', marginLeft: '10px'}}
                        >
                          Save
                        </ToggleButton>}
                        {postInfo && checkLiked() ?
                      <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={false}
                        value="1"
                        onClick={handleUnlike}
                        style={{float: 'right'}}
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
                        style={{float: 'right'}}
                      >
                        Like
                      </ToggleButton>}
                      </> : <><p style={{float: 'right', marginTop: '8px'}}>Please sign in to like and save posts.</p></>}

                        
                        {showComments ? <><br></br><br></br><CommentsPage style={{clear: 'both'}} curPostId={id}/></> : null}
                </Container>
            </Card.Footer>
            </Card>
            </Container> 
      );
    
    }

    
export default Post;