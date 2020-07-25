import React, { useEffect, useRef, useContext, useCallback, useState } from 'react';
import { animateScroll } from "react-scroll";
import "./style.css";
import { Col, Row } from 'react-bootstrap';
import UserInfoContext from '../../utils/UserInfoContext';
import ChatInput from '../ChatInput';
import moment from 'moment';

function ChatBox({ handleNewMessageState, newChatState, setIsPreviousChatState, setCurrentChatIdState }) {

  const userData = useContext(UserInfoContext);
  const [convoState, setConvoState] = useState([]);

  const messagesEndRef = useRef(null)

  function scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chat-box-body"
    });
  }

  useEffect(() => {

    setConvoState([]);

    scrollToBottom();


  }, [userData.username]);


  useEffect(() => {



    scrollToBottom();


  }, [convoState]);

  useEffect(() => {

    let chatUser = [];

    userData.chats.map(chat => {

      chat.users.map(user =>

        chatUser.push(user)

      )

    })

    {
      chatUser?.some((user) => user._id === newChatState.receiverId)
        // ? setConvoState(myConvo) : 
        ? renderPreviousChat() :
        renderNoChatMessage()
    }





    scrollToBottom();


  }, [newChatState]);


  const handleSendMessage = useCallback((message) => {

    setConvoState(convoState => [...convoState, message])
    scrollToBottom();
  });


  function renderPreviousChat() {

    setIsPreviousChatState(true);
    userData.chats.map(chat => {

      chat.users.map(user => {
        if (user._id === newChatState.receiverId) {

          setConvoState(chat.messages)
          setCurrentChatIdState(chat._id)
        }
      })

    })
  }

  function renderNoChatMessage() {

    setIsPreviousChatState(false);
    let noChatArray = [
      { type: "no chat history" }
    ]

    setConvoState(noChatArray)
  }


  return (
    <div>
      <div ref={messagesEndRef} id="chat-box-body">


        {convoState.map((convo => {


          if (convo.type === "no chat history") {
            return (
              <Row>
              </Row>
            )
          }

          if (convo.senderId === userData._id) {
            return (
              <div>
                <Row id="chat-message-row">
                  <Col xs={6} sm={6} md={6} lg={6}></Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <div id="this-user-message">
                      {convo.messageText}
                    </div>
                  </Col>
                </Row>
                <Row id="chat-message-row">
                  <Col xs={6} sm={6} md={6} lg={6}></Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <img id="this-user-pic" src={convo.senderPicture} />
                    <div id="this-user-time">{moment(convo.createdAt).calendar()} </div>
                  </Col>
                </Row>
              </div>
            )
          }
          return (
            <div>
              <Row id="chat-message-row">
                <Col xs={6} sm={6} md={6} lg={6}>
                  <div id="that-user-message">
                    {convo.messageText}
                  </div>
                </Col>
              </Row>
              <Row id="chat-message-row">
                <Col xs={6} sm={6} md={6} lg={6}>
                <img id="that-user-pic" src={convo.senderPicture} />
                  <div id="that-user-time">{moment(convo.createdAt).calendar()}</div>
                </Col>
              </Row>
            </div>
          )
        }))}


      </div>
      <ChatInput
        handleSendMessage={handleSendMessage}
        handleNewMessageState={handleNewMessageState}
        newChatState={newChatState}
      >
      </ChatInput>
    </div>

  );

}

export default ChatBox;