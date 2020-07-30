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

  const userData = useContext(UserInfoContext);

  // create function that accepts the friend's mongo _id value as param and deletes the friend from current user's collection
  const handleDeleteFriend = (friend_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    API.deleteFriend(friend_id, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={0} s={0} md={1} lg={2}></Col>
          <Col id='search-wrap' xs={12} s={12} md={10} lg={8}>
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
    </>
  );
}

export default SavedFriends;
