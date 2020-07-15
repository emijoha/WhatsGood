import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import "./style.css";




function ProfilePic(props) {
 
  return (
    <div>
    <img className="profile-pic" 
        src={props.picture} 
        alt={props.username}
    />
    </div>
  );
}

export default ProfilePic;