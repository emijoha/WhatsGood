import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Text, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteNotification } from '../../utils/API'
import './style.css';

import UserInfoContext from '../../utils/UserInfoContext'

const NotificationDropdownItem = ({ likerUsername, title, notificationId, type, mediaType, mediaId, comment }) => {

    const userData = useContext(UserInfoContext);

    const handleDeleteNotification = (notificationId) => {
        console.log("notification Id", notificationId);

        deleteNotification(notificationId)
            .then(() => {
                userData.getUserData();
            });

    };
if(type === 'like'){
    return (
        <NavDropdown.Item  as={Link} to={'/profile'}>
            {likerUsername} liked your post of {title}
            <Button id="notification-button" 
                onClick={() => handleDeleteNotification(notificationId)}
            >Oh, word.
            </Button>
        </NavDropdown.Item>
    )
} else if(type === 'comment') {
    return(
        <NavDropdown.Item as={Link} to={'/profile'}>{likerUsername} commented on your post of {title}:'{comment}'<Button id="notification-button" onClick={() => handleDeleteNotification(notificationId)}>Oh, word.</Button></NavDropdown.Item>
    )
} else if(type === 'follow') {
    return(
        <NavDropdown.Item  as={Link} to={`/search-user?username=${likerUsername}`}>{likerUsername} started following you<Button id="notification-button" onClick={() => handleDeleteNotification(notificationId)}>Oh, word.</Button></NavDropdown.Item>
    )
} else {
  return(
    <NavDropdown.Item  as={Link} to={'/messages'}>{likerUsername} sent you a new message<Button id="notification-button" onClick={(event) => handleDeleteNotification(notificationId)}>Oh, word.</Button></NavDropdown.Item>
)
}
};

export default NotificationDropdownItem;