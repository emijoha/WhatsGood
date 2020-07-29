import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Text, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteNotification } from '../../utils/API'
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


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
        <div className='notification-text'>
          {likerUsername} liked your post of {title}
        </div>
        <div onClick={(event) => event.stopPropagation()}>
          <a
            id="notification-button"
            onClick={(event) => handleDeleteNotification(notificationId, event)}>
            <FontAwesomeIcon
              // className='search-icon sidebar-icon'
              id='neon-hover'
              icon={faTrashAlt}
            />
          </a>
        </div>
      </NavDropdown.Item>
    )
  } else if (type === 'comment') {
    return (
      <NavDropdown.Item className='notification-item' as={Link} to={'/profile'}>
        <div className='notification-text'>
          {likerUsername} commented on your post of {title}:'{comment}'
        </div>
        <div onClick={(event) => event.stopPropagation()}>
          <a
            id="notification-button"
            onClick={(event) => handleDeleteNotification(notificationId, event)}>
            <FontAwesomeIcon
              // className='search-icon sidebar-icon'
              id='neon-hover'
              icon={faTrashAlt}
            />
          </a>
        </div>
      </NavDropdown.Item>
    )
  } else if (type === 'follow') {
    return (
      <NavDropdown.Item className='notification-item' as={Link} to={`/friend_profile?username=${likerUsername}`}>
        <div className='notification-text'>
        {likerUsername} started following you
        </div>
        <div onClick={(event) => event.stopPropagation()}>
          <a
            id="notification-button" 
            onClick={(event) => handleDeleteNotification(notificationId, event)}
          >
            <FontAwesomeIcon
              // className='search-icon sidebar-icon'
              id='neon-hover'
              icon={faTrashAlt}
            />
          </a>
        </div>
      </NavDropdown.Item>
    )
  } else {
    return (
      <NavDropdown.Item className='notification-item' as={Link} to={'/messages'}>
        <div className='notification-text'>
        {likerUsername} sent you a new message <div onClick={(event) => { event.stopPropagation() }}>
        </div>
          <a id="notification-button"
           onClick={(event) => handleDeleteNotification(notificationId, event)}>
            <FontAwesomeIcon
              // className='search-icon sidebar-icon'
              id='neon-hover'
              icon={faTrashAlt}
            />
          </a>
        </div>
      </NavDropdown.Item>
    )
  }
};

export default NotificationDropdownItem;