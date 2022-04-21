import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';

const Message = ({messageId, sender, content}) => {
    //var messageId = props.messageId;
    //todo: use effect to get message content

    return (
        <div>
        {sender === 'placeholder' ?
        <div>
        <div style={{ float:'left', maxWidth:'350px' }}>
        <Card>
            <Card.Body>
            <Card.Text>
            {content}
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
            {content}
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