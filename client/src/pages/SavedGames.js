import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import NotLoggedIn from '../components/NotLoggedIn/NotLoggedIn';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedGames() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  console.log("USER DATA", userData);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteGame = (game_id) => {
    console.log(game_id)
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteGame(game_id, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      {userData.username ?
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Viewing saved video games!</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2>
              {userData.savedGames.length
                ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'video game' : 'video games'}:`
                : 'You have no saved video games!'}
            </h2>
            <CardColumns>
              {userData.savedGames.map((game) => {
                return (
                  <Card key={game._id} border='dark'>
                    {game.image ? <Card.Img src={game.image} alt={`The image for ${game.title}`} variant='top' /> : null}
                    <Card.Body>
                      <Card.Title>{game.title}</Card.Title>
                      <p className='small'>Developer: {game.developer}</p>
                      <Card.Text>{game.description}</Card.Text>
                      <Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game._id)}>
                        Delete this Game!
                  </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </> :
        <NotLoggedIn />}
    </>
  );
}

export default SavedGames;
