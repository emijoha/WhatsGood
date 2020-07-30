import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, CardColumns } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import SearchCards from '../../components/SearchCards';
import SearchIconGroup from '../../components/SearchIconGroup';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { saveFriend, searchFriend, searchAllUsers, deleteFriend, addNotification } from '../../utils/API';
import useDebounce from '../../utils/debounceHook';
import './style.css';

function SearchUser() {
  // create state for holding returned google api data
  // const [searchedUser, setSearchedUser] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const userData = useContext(UserInfoContext);

  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    if (!searchInput) {
      return;
    }
    if (debouncedSearchInput) {
      searchAllUsers(searchInput)
        .then((res) => {
          let foundUsers = res.data.map(user => ({
            username: user.username,
            _id: user._id,
            picture: user.picture,
            email: user.email,
            music: user.savedMusic,
            movies: user.savedMovies,
            games: user.savedGames,
            books: user.savedBooks,
            firstName: user.firstName,
            lastName: user.lastName
          }))

          foundUsers.filter(user => (user._id !== userData._id)).sort();

          return setSearchedUsers(foundUsers);
        })
        .catch(err => console.log(err));
    }
  }, [debouncedSearchInput]);


  // create method to search for users and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    searchAllUsers(searchInput)
      .then((res) => {
        let foundUsers = res.data.map(user => ({
          username: user.username,
          _id: user._id,
          picture: user.picture,
          email: user.email,
          music: user.savedMusic,
          movies: user.savedMovies,
          games: user.savedGames,
          books: user.savedBooks,
          firstName: user.firstName,
          lastName: user.lastName
        }))

        foundUsers.filter(user => (user._id !== userData._id)).sort();

        return setSearchedUsers(foundUsers);
      })
      .catch(err => console.log(err));

  }

  // function to handle saving a friend to database
  const handleSaveFriend = (user) => {
    // find the friend in `searchedUser` state by the matching id
    // const userToSave = searchedUser.find((user) => user._id === userId);

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }

    // send the friend data to our api
    saveFriend(user, token)
      .then(() => {
        userData.getUserData();
      })
      .catch((err) => console.log(err));

    addNotification({
      likerUsername: userData.username,
      type: "follow",
      ownerId: user._id,
      followerId: userData._id
    })
      .then(() => {
        userData.getUserData();
      })
      .catch(err => console.log(err));
  };

  const handleDeleteFriend = (friend_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    deleteFriend(friend_id, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container >
        <Row>
          <Col xs={0} s={0} md={1} lg={2}></Col>
          <Col id='search-wrap' xs={12} s={12} md={10} lg={8}>
            <h5 id="search-heading">SEARCH FRIENDS</h5>
            <div id='form-hugger'>
              <Form onSubmit={handleFormSubmit}>
                <Form.Control
                  id="api-search-input"
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a friend'
                />
                <SearchIconGroup />
                <Button id="form-search-btn" type='submit' size='lg'>
                  SEARCH
                  </Button>
              </Form>
            </div>
          </Col>
          <Col xs={0} s={0} md={1} lg={2}></Col>
        </Row>
        <hr></hr>
      </Container>
      {/* {searchedUser._id && */}
      <Container>
        <CardColumns>
          <SearchCards
            cardType='searchedUsers'
            searchedUsers={searchedUsers}
            savedArray={userData.friends}
            handleSaveFriend={handleSaveFriend}
            handleDeleteFriend={handleDeleteFriend}
          />
        </CardColumns>
      </Container>
      {/* } */}
    </>
  );
}

export default SearchUser;