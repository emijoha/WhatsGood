import React, { useState, useContext } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import "./style.css";
import { searchFriend, addNotification } from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import UserInfoContext from '../../utils/UserInfoContext';

function ChatInput({ handleSendMessage, handleNewMessageState, newChatState }) {


  const [chatInput, setChatInput] = useState('');
  const userData = useContext(UserInfoContext);

  // create method to search for users and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();


    if (!chatInput) {
      return false;
    }
    let newMessage =
    {
      senderPicture: userData.picture,
      senderId: userData._id,
      messageText: chatInput
    }

    const notificationData =
    {
      likerUsername: userData.username,
      ownerId: newChatState.receiverId,
      type: 'message'

    }

    handleSendMessage(newMessage);

    let newMessageObject =
    {
      senderId: userData._id,
      senderName: userData.username,
      senderPicture: userData.picture,
      timeStamp: Date.now(),
      createdAt: Date(),
      messageText: chatInput


    }

    handleNewMessageState(newMessageObject);

    setChatInput("");

    addNotification(notificationData)
      .then(() => {
        userData.getUserData();
      })
      .catch(err => console.log(err));
  }


  return (


    <Form onSubmit={handleFormSubmit}>
      <Form.Row id="message-submit-group">
        <Col xs={11} md={11} lg={11}>
          <Form.Control
            id="chat-input"
            name='searchInput'
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            type='text'
            size='lg'
          />
        </Col>
        <Col xs={1} md={1} lg={1}>
          <a id="message-icon-button" className='purple neon-hover'  onClick={handleFormSubmit} size='lg' disabled={!newChatState.username}>
            <FontAwesomeIcon icon={faPaperPlane} size={'md'} />
          </a>
        </Col>
      </Form.Row>
    </Form>



  );

}

export default ChatInput;