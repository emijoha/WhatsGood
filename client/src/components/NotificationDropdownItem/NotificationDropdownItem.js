import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Text, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteNotification } from '../../utils/API'
import './style.css';

import UserInfoContext from '../../utils/UserInfoContext'

const NotificationDropdownItem = ({ likerUsername, title, notificationId, type, mediaType, mediaId, comment }) => {

  const userData = useContext(UserInfoContext)

  const handleDeleteNotification = (notificationId, event) => {
  
    event.preventDefault()

    deleteNotification(notificationId)
      .then(() => {
        userData.getUserData();
      });
  };

  if (type === "like") {
    return (
      <NavDropdown.Item className='notification-item' as={Link} to={'/profile'}>
        {likerUsername} liked your post of {title}
        <div onClick={(event) => event.stopPropagation()}>
        <Button
          id="notification-button"
          onClick={(event) => handleDeleteNotification(notificationId, event)}>
          Oh, word
        </Button>
        </div>
      </NavDropdown.Item>
    )
  } else if (type === 'comment') {
    return (
      <NavDropdown.Item className='notification-item' as={Link} to={'/profile'}>
        {likerUsername} commented on your post of {title}:'{comment}'
        <div onClick={(event) => event.stopPropagation()}>
        <Button
          id="notification-button"
          onClick={(event) => handleDeleteNotification(notificationId, event)}>
          Oh, word
          </Button>
          </div>
      </NavDropdown.Item>
    )
  } else if (type === 'follow') {
    return(
        <NavDropdown.Item className='notification-item' as={Link} to={`/search_user?username=${likerUsername}`}>
          {likerUsername} started following you
          <div onClick={(event) => event.stopPropagation()}>
          <Button 
            id="notification-button" 
            onClick={(event) => handleDeleteNotification(notificationId, event)}
          >
              Oh, word
          </Button>
          </div>
        </NavDropdown.Item>
    )
} else {
  return(
    <NavDropdown.Item className='notification-item' as={Link} to={'/messages'}>{likerUsername} sent you a new message <div onClick={(event) => {event.stopPropagation()}}><Button id="notification-button" onClick={(event) => handleDeleteNotification(notificationId, event)}>Oh, word</Button></div></NavDropdown.Item>
)
}
};

export default NotificationDropdownItem;