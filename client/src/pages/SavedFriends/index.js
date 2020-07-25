import React, { useContext, useState, useEffect } from 'react';
import { Jumbotron, Row, Col, Container, CardColumns, Card, Button } from 'react-bootstrap';
import NotLoggedIn from '../../components/NotLoggedIn';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';

// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import * as API from '../../utils/API';
import SavedCards from '../../components/SavedCards';
function SavedFriends() {
  // const [friendsArray, setFriendsArray] = useState([]);
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  // useEffect(() => {
  //     console.log("user data Id", userData)

  //     if (userData._id !== '') {
  //         API.getUser(userData._id)
  //             .then(result => {
  //                 console.log("RESULT DATA FRIENDS", result.data.friends);
  //                 setFriendsArray(friendsArray => [...friendsArray], result.data.friends);
  //             });
  //     }

  // }, [userData]);


  // OLD WAY TO GET FRIENDS
  // useEffect(() => {

  //    console.log("mounted")
  //    console.log("USER DATA INSIDE USE EFFECT", userData.friends)
  //     userData.friends.map(friend => {

  //         console.log("this is friend", friend)
  //         API.getUser(friend)
  //             .then(result => {

  //             setFriendsArray(friendsArray => [...friendsArray, result.data])
  //             })
  //     });
  // }, [userData, userData.friends]);

  // create function that accepts the friend's mongo _id value as param and deletes the friend from current user's collection
  const handleDeleteFriend = (friend_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    API.deleteFriend(friend_id, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData(),
        console.log("made it back"))
      .catch((err) => console.log(err));
  };

  return (
    <div id="container">
      {/* {userData.username ?
        <div>
          <div id="header-div">

            {userData.friends.length === 0
              ? <div id="no-media-div">
                <p><h5 className="text-center" id="header">LOOKS EMPTY IN HERE.</h5></p>
                <p><h5 className="text-center" id="highlight-header">GO TO SEARCH AND ADD SOME FRIENDS!</h5></p>
              </div>
              : <h5 className="text-center" id="header">MY FRIENDS</h5>}


          </div> */}
      <Row>
        <Container>
          <Row>
            <Col xs={0} s={0} md={1} lg={2}></Col>
            <Col xs={12} s={12} md={10} lg={8}>
              <h5 className="text-center friend-text purple">
                MY FRIENDS
              </h5>
              <div id="friend-icon-group">
                <div id="friend-icon-div">
                  <FontAwesomeIcon
                    className='friend-page-icon'
                    icon={faUserFriends}
                  />
                  <p id='friend-count-sub'>
                    {userData.friends.length}
                  </p>
                </div>
                <div id="friend-icon-div">
                  <a href='./messages'>
                    <FontAwesomeIcon
                      className='friend-page-icon'
                      id='neon-hover'
                      icon={faPaperPlane}
                    />
                  </a>
                  <p id='friend-count-sub'>
                    MSG
                  </p>
                </div>
                <div id="friend-icon-div">
                  <a href='./search_user'>
                    <FontAwesomeIcon
                      className='friend-page-icon'
                      id='neon-hover'
                      icon={faSearch}
                    />
                  </a>
                  <p id='friend-count-sub'>
                    FIND
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={0} s={0} md={1} lg={2}></Col>
          </Row>
          <hr></hr>
        </Container>
      </Row>

      <Container>
        <CardColumns>
          <SavedCards
            cardType='savedFriends'
            savedArray={userData.friends}
            handleDeleteFriend={handleDeleteFriend}
          />
        </CardColumns>
      </Container>

      {/* ITS BUGGY */}
      {/* {!userData.username
          ? <NotLoggedIn />
          : null
        } */}
    </div>
  );
}

export default SavedFriends;
