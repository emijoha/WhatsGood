import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';
import NotLoggedIn from '../components/NotLoggedIn';
import SavedCards from '../components/SavedCards';

function SavedMedia() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = (bookId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteBook(bookId, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteMusic = (musicId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteMusic(musicId, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (movieId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteMovie(movieId, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  const handleDeleteGame = (gameId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteGame(gameId, token)
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
              <h1>Viewing All Saved Media!</h1>
            </Container>
          </Jumbotron>
          <Container>
            <SavedCards
              cardType='savedBooks'
              savedArray={userData.savedBooks}
              handleDeleteBook={handleDeleteBook}
            />
            <SavedCards
              cardType='savedMusic'
              savedArray={userData.savedMusic}
              handleDeleteMusic={handleDeleteMusic}
            />
            <SavedCards
              cardType='savedMovies'
              savedArray={userData.savedMovies}
              handleDeleteMovie={handleDeleteMovie}
            />
            <SavedCards
              cardType='savedGames'
              savedArray={userData.savedGames}
              handleDeleteGame={handleDeleteGame}
            />
          </Container>
        </> :
        <NotLoggedIn />}
    </>
  );
}

export default SavedMedia;
