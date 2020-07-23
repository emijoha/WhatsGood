import React, { useState, useContext, useCallback } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import SearchCards from '../../components/SearchCards';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { saveGame, searchVideoGames } from '../../utils/API';

function SearchGames() {
  // create state for holding returned api data
  const [searchedGame, setSearchedGame] = useState([]);
  // create state for holding our search field data
  const [searchTitle, setSearchTitle] = useState('');
  const [searchPlatform, setSearchPlatform] = useState('pc');

  const userData = useContext(UserInfoContext);

  // create method to search for games and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchTitle || !searchPlatform) {
      return;
    }

    searchVideoGames(searchTitle, searchPlatform)
      .then(({ data }) => {
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

        return setSearchedGame(gameData);
      })
      .then(() => {
        setSearchTitle('');
        setSearchPlatform('pc');
      })
      .catch((err) => console.log(err));
  };

  // create function to handle saving a book to our database
  const handleSaveGame = useCallback((game, userRating, userReview) => {
    const gameToSave = {
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
      <div id="inner-container">
        <Container>
        <h5 id="search-header">SEARCH VIDEO GAMES</h5>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  id="form-input"
                  name='searchTitle'
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Game title'
                />
                <Form.Control
                  id="form-input"
                  type='text'
                  size='lg'
                  name='searchPlatform'
                  onChange={(e) => setSearchPlatform(e.target.value)}
                  as='select'
                >
                  <option value='pc'>PC</option>
                  <option value='xbox-one'>Xbox One</option>
                  <option value='xbox-360'>Xbox 360</option>
                  <option value='playstation-3'>PlayStation 3</option>
                  <option value='playstation-4'>PlayStation 4</option>
                </Form.Control>
              </Col>
              <Col xs={12} md={4}>
                <Button id="form-button" type='submit' variant='success' size='lg'>
                  SEARCH
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </div>
      <Container>
        <SearchCards
          cardType='searchedGames'
          resultArray={searchedGame}
          savedArray={userData.savedGames}
          username={userData.username}
          cb={handleSaveGame}
        />
      </Container>
    </div>
  );
}



export default SearchGames;
