import React, { useState, useContext, useEffect } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SearchCards from '../../components/SearchCards';
import SavedIconLinks from '../../components/SavedIconLinks';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { saveFriend, searchFriend, deleteFriend, addNotification } from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function SearchUser() {
  // create state for holding returned google api data
  const [searchedUser, setSearchedUser] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const userData = useContext(UserInfoContext);

  const [queryStringUsername, setQueryStringUsername] = useState()

  const history = useHistory();

  useEffect(() => {
    // if (window.location.search) {
    setQueryStringUsername(window.location.search.split('=')[1])
    searchFriend(window.location.search.split('=')[1])
      .then(user => setSearchedUser({
        username: user.data.username,
        _id: user.data._id,
        picture: user.data.picture,
        email: user.data.email,
        music: user.data.savedMusic,
        movies: user.data.savedMovies,
        games: user.data.saveGames,
        books: user.data.savedBooks

      }))
    // }
  }, [queryStringUsername !== window.location.search.split('=')[1]]);


  console.log('userData', userData)
  const notificationData = {
    likerUsername: userData.username,
    type: "follow",
    ownerId: searchedUser._id,
    followerId: userData._id
  };


  // create method to search for users and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("clicked", searchInput)

    if (!searchInput) {
      return false;
    }
    // NEED TO PASS SEARCHINPUT AS PARAMS.USERNAME
    searchFriend(searchInput)
      .then(user => setSearchedUser({
        username: user.data.username,
        _id: user.data._id,
        picture: user.data.picture,
        email: user.data.email,
        music: user.data.savedMusic,
        movies: user.data.savedMovies,
        games: user.data.savedGames,
        books: user.data.savedBooks
      }),
        setSearchInput(''),
        history.push('/search_user')
        // window.location.reload()
      );
  }

  // function to handle saving a friend to database
  const handleSaveFriend = () => {
    // find the friend in `searchedUser` state by the matching id
    // const userToSave = searchedUser.find((user) => user._id === userId);

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }

    // send the friend data to our api
    saveFriend(searchedUser, token)
      .then(() => {
        userData.getUserData();
      })
      .catch((err) => console.log(err));

    addNotification(notificationData)
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
      .then(() => userData.getUserData(),
        console.log("made it back"))
      .catch((err) => console.log(err));
  };

  return (
    <div id="container">
      <Row>
        <Container id='search-wrap'>
          <Row>
            <Col xs={0} s={0} md={1} lg={2}></Col>
            <Col xs={12} s={12} md={10} lg={8}>
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
                    placeholder='Search for a friend by username'
                  />
                  <p className='search-icon-group'>
                    <a href='/search_music'>
                      <FontAwesomeIcon
                        className='search-icon'
                        id='neon-hover'
                        icon={faMusic}
                      />
                    </a>
                    <a href='/search_movies'>
                      <FontAwesomeIcon
                        className='search-icon'
                        id='neon-hover'
                        icon={faVideo}
                      />
                    </a>
                    <a href='/search_games'>
                      <FontAwesomeIcon
                        className='search-icon'
                        id='neon-hover'
                        icon={faGamepad}
                      />
                    </a>
                    <a href='/search_books'>
                      <FontAwesomeIcon
                        className='search-icon'
                        id='neon-hover'
                        icon={faBookOpen}
                      />
                    </a>
                    <a href='/search_user'>
                      <FontAwesomeIcon
                        className='search-icon'
                        id='neon-hover'
                        icon={faUserFriends}
                      />
                    </a>
                  </p>
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
      </Row>
      {searchedUser._id &&
        <Container>
          <SearchCards
            cardType='searchedUsers'
            searchedUser={searchedUser}
            savedArray={userData.friends}
            handleSaveFriend={handleSaveFriend}
            handleDeleteFriend={handleDeleteFriend}
          />
        </Container>
      }
    </div>
  );
}

export default SearchUser;