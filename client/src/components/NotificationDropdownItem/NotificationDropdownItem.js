import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Text, NavDropdown } from 'react-bootstrap';
import { deleteNotification } from '../../utils/API'
import './style.css'

import UserInfoContext from '../../utils/UserInfoContext'

const NotificationDropdownItem = ({ likerUsername, title, notificationId }) => {

    const userData = useContext(UserInfoContext)

    const handleDeleteNotification = (notificationId) => {
        console.log("notification Id", notificationId)
        deleteNotification(notificationId)
            .then(() => {
                userData.getUserData();
            });

    };

    return (
        <NavDropdown.Item>{likerUsername} liked your post of {title}<Button id="notification-button" onClick={() => handleDeleteNotification(notificationId)}>Oh, word.</Button></NavDropdown.Item>
    )
};

export default NotificationDropdownItem;