import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { saveGame, searchVideoGames } from '../utils/API';

function SearchGames() {
  // create state for holding returned api data
  const [searchedGame, setSearchedGame] = useState([]);
  // create state for holding our search field data
  const [searchTitle, setSearchTitle] = useState('');
  const [searchPlatform, setSearchPlatform] = useState('');

  const userData = useContext(UserInfoContext);

  // create method to search for games and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchTitle || !searchPlatform) {
      return false;
    }

    searchVideoGames(searchTitle, searchPlatform)
      .then(({ data }) => {
        const gameData = [{
          gameId: `${data.result.title}-${data.result.developer}-${searchPlatform}`,
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
        setSearchPlatform('');
      })
      .catch((err) => console.log(err));
  };

  // create function to handle saving a book to our database
  const handleSaveGame = () => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    // send the books data to our api
    saveGame(searchedGame[0], token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Video Games!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchTitle'
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Game title'
                />
                <Form.Control 
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
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>{searchedGame.length ? `Viewing ${searchedGame.length} results:` : 'Search for a video game to begin'}</h2>
        <CardColumns>
          {searchedGame.map((game) => {
            return (
              <Card key={game.gameId} border='dark'>
                {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                <Card.Body >
                  <Card.Title>{game.title}</Card.Title>
                  <p className='small'>Developer: {game.developer}</p>
                  <Card.Text>{game.description}</Card.Text>
                  {userData.username && (
                    <Button
                      disabled={userData.savedGames?.some((savedGame) => savedGame.gameId === game.gameId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveGame()}>
                      {userData.savedGames?.some((savedGame) => savedGame.gameId === game.gameId)
                        ? 'This game has already been saved!'
                        : 'Save this game!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}



export default SearchGames;
