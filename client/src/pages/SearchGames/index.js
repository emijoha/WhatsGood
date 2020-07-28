import React, { useState, useContext, useCallback } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import SearchCards from '../../components/SearchCards';
import SearchIconGroup from '../../components/SearchIconGroup';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { saveGame, searchVideoGames } from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function SearchGames() {
  // create state for holding returned api data
  const [searchedGame, setSearchedGame] = useState([]);
  // create state for holding our search field data
  const [searchTitle, setSearchTitle] = useState('');
  const [searchPlatform, setSearchPlatform] = useState('pc');

  const [validSearch, setValidSearch] = useState(true);

  const userData = useContext(UserInfoContext);

  // create method to search for games and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchTitle || !searchPlatform) {
      return;
    }

    searchVideoGames(searchTitle, searchPlatform)
      .then(({ data }) => {
        if (data.result === "No result") {
          return setValidSearch(false);
        } 
          const gameData = [{
            mediaId: `${data.result.title}-${data.result.developer}-${searchPlatform}`,
            timeStamp: Date.now(),
            createdAt: Date(),
            developer: data.result.developer || ['No developer to display'],
            title: data.result.title,
            description: data.result.description,
            image: data.result.image || '',
          }];
          console.log(data);

          setSearchedGame(gameData);
          setValidSearch(true);
      })
      .then(() => {
        setSearchTitle('');
      })
      .catch((err) => console.log(err));
  };


  // create function to handle saving a book to our database
  const handleSaveGame = useCallback((game, userRating, userReview) => {
    const gameToSave = {
      username: userData.username,
      userId: userData._id,
      mediaType: "game",
      mediaId: game.mediaId,
      timeStamp: Date.now(),
      createdAt: Date(),
      developer: game.developer,
      title: game.title,
      description: game.description,
      image: game.image,
      userRating: userRating,
      userReview: userReview
    }

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    // send the books data to our api
    saveGame(gameToSave, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  });

  return (
    <div id="container">
      <Row>
        <Container >
          <Row>
            <Col xs={0} s={0} md={1} lg={2}></Col>
            <Col  id='search-wrap' xs={12} s={12} md={10} lg={8}>
              <h5 id="search-heading">SEARCH VIDEO GAMES</h5>
              <div id='form-hugger'>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Control
                    id="api-search-input"
                    name='searchTitle'
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    type='text'
                    size='lg'
                    placeholder='Search a game title'
                  />
                  <select id='platform-select'>
                    <option>Select the platform</option>
                    <option value='pc'>PC</option>
                    <option value='xbox-one'>Xbox One</option>
                    <option value='xbox-360'>Xbox 360</option>
                    <option value='playstation-3'>PlayStation 3</option>
                    <option value='playstation-4'>PlayStation 4</option>
                  </select>
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
      </Row>
      <Container>
        {validSearch ?
          <SearchCards
            cardType='searchedGames'
            resultArray={searchedGame}
            savedArray={userData.savedGames}
            username={userData.username}
            cb={handleSaveGame}
          />
          : <h2>Sorry, we could not find any video games that matched your search.</h2>
        }
      </Container>
    </div>
  );
}



export default SearchGames;
