import React, { useContext, useState, useEffect, useCallback } from 'react';
import "./style.css";
import SearchFriends from '../../components/SearchFriends';
import MessageList from '../../components/MessageList';
import ChatBox from '../../components/ChatBox';
import { Container, Col, Row } from 'react-bootstrap';
import UserInfoContext from '../../utils/UserInfoContext';
import * as API from '../../utils/API';
import AuthService from '../../utils/auth';


function Messages() {

  const [userListState, setUserListState] = useState([]);
  const [newChatState, setNewChatState] = useState({});
  const [newMessageState, setNewMessageState] = useState({});
  const [isPreviousChatState, setIsPreviousChatState] = useState(Boolean);
  const [currentChatIdState, setCurrentChatIdState] = useState("");

  const userData = useContext(UserInfoContext);

  console.log("userDATA DREY:  ", userData);

  useEffect(() => {

    getAllUserMessages();


  }, [userData.username]);


  // function getAllUserMessages() {

  //       setUserListState([])
  //   userData.friends.map(friend => {

  //     API.getUser(friend.id)
  //       .then(result => {
  //         console.log("these are the results from the api call", result)
  //         setUserListState(userListState => [...userListState, result.data])
  //       })
  //     });
  // }

  const getAllUserMessages = useCallback(() => {
    setUserListState([]);



    userData.chats.map(chat => {

      let chatUsersArray = chat.users;

      for (var i = chatUsersArray.length - 1; i >= 0; i--) {
        if (chatUsersArray[i]._id === userData._id) {
          chatUsersArray.splice(i, 1);
        }
      }

      chatUsersArray.map(chatUser => {

        API.getUser(chatUser._id)
          .then(result => {

            setUserListState(userListState => [...userListState, result.data])
          })
      });



    })



  });


  const sendSearchedUserToList = useCallback((userObject) => {
    setUserListState([userObject])
  });

  const handleNewChatState = useCallback((userObject) => {
    setNewChatState(userObject)
  });

  const handleNewMessageState = useCallback((newMessageObject) => {
    setNewMessageState(newMessageObject)

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }





    function genHexString(len) {
      const hex = '0123456789abcdef';
      let output = '';
      for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
      }
      return output;
    }


    let chatData = {
      _id: genHexString(24),
      senderId: newMessageObject.senderId,
      senderName: newMessageObject.senderName,
      senderPicture: newMessageObject.senderPicture,
      timeStamp: newMessageObject.timeStamp,
      createdAt: newMessageObject.createdAt,
      messageText: newMessageObject.messageText,
      users: [newChatState.receiverId, newMessageObject.senderId]
    }

    console.log("chat data, ", chatData)

    if (!isPreviousChatState) {

      API.saveChat(chatData, token)
        .then((res) => {
          userData.getUserData();

          setIsPreviousChatState(true)

          // userData.chats.map(chat => {

          //   chat.users.map(user => {
          //     if (user._id === newChatState.receiverId){

          setCurrentChatIdState(chatData._id)
          console.log("this is the currect chatData._id", chatData._id)
          //     }      
          //   })

          // })



        })
        .catch((err) => console.log(err))



    }

    if (isPreviousChatState) {

      let messageData = {
        senderId: newMessageObject.senderId,
        senderName: newMessageObject.senderName,
        senderPicture: newMessageObject.senderPicture,
        timeStamp: newMessageObject.timeStamp,
        createdAt: newMessageObject.createdAt,
        messageText: newMessageObject.messageText,
        users: [newChatState.receiverId, newMessageObject.senderId],
        chatId: currentChatIdState

      }

      API.saveMessage(messageData, token)

        .then(() => {
          userData.getUserData();


        })
        .catch((err) => console.log(err))

    }
    // let messageData = {

    //     chatId: userData.chats[userData.chats.length - 1]._id,
    //     senderId: newMessageState.senderId, 
    //     senderName: newMessageState.senderName,
    //     senderPicture: newMessageState.senderPicture,
    //     timeStamp: newMessageState.timeStamp,
    //     createdAt: newMessageState.createdAt,
    //     messageText: newMessageState.messageText  

    //   }



    //   API.saveMessage(messageData, token)
    //   .then(() => {
    //     userData.getUserData();


    //   })
    //   .catch((err) => console.log(err))

    // console.log("userData id", userData.chats[userData.chats.length - 1]._id)




  });

  return (


    <Container className='movie-border card' id="messages-container">


      <span className='messenger-title' >YOUR MESSAGES</span>

      <div id="sm-screen-search">
        <SearchFriends sendSearchedUserToList={sendSearchedUserToList}></SearchFriends>
      </div>
      <Row>
        <Col xs={3} s={3} md={3} lg={4}>
          <div id="lg-screen-search">
            <SearchFriends sendSearchedUserToList={sendSearchedUserToList}></SearchFriends>
          </div>
          <MessageList userList={userListState}
            getAllUserMessages={getAllUserMessages}
            handleNewChatState={handleNewChatState}
          ></MessageList>
        </Col>
        <Col xs={9} s={9} md={9} lg={8} id='line-divide'>
          {newChatState.username ? <h5 id="chat-box-header"> Messaging with {newChatState.username}</h5> : <h5 className='purple' id="chat-box-header">Select a friend to chat</h5>}
          <ChatBox  handleNewMessageState={handleNewMessageState}
            setIsPreviousChatState={setIsPreviousChatState}
            setCurrentChatIdState={setCurrentChatIdState}
            newChatState={newChatState}>

          </ChatBox>


        </Col>
      </Row>

    </Container>


  );

}

export default Messages;





