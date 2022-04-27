import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Message = ({id}) => {
    //var messageId = props.messageId;
    const user = JSON.parse(localStorage.getItem('user'));

    const [content, setContent] = useState({});

    //todo: use effect to get message content
    useEffect(() => {
        axios({
          method: 'get',
          url: 'http://127.0.0.1:5000/get_message?id=' + id,
        }).then( res => {
          if (res.data.data !== "No Results") {
            console.log(res.data);
            setContent(res.data);
          } 
        }).catch(error => {
          //console.error(error);
          //navigate("/404");
        })
      },[]);

    return (
        <div>
        {user && content && content['sender'] !== user['username'] ?
        <div>
        <div style={{ float:'left', maxWidth:'350px' }}>
        <Card>
            <Card.Body>
            <Card.Text>
            {content ? content['content'] : "Loading!!!"}
            </Card.Text>
            </Card.Body>
        </Card>
        </div>
        <br style={{ clear:'both', marginBottom:'40px' }}></br>
        </div>
        :
        <div>
        <div style={{ float:'right', maxWidth:'350px'}}>
        <Card>
            <Card.Body>
            <Card.Text>
            {content ? content['content'] : "Loading!!!"}
            </Card.Text>
            </Card.Body>
        </Card>
        </div>
        <br style={{ clear:'both', marginBottom:'40px' }}></br>
        </div>
        }
        </div>
    );
}
export default Message;