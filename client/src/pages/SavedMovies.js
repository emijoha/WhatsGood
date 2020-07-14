import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedMovies() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  console.log("this is the user data, ", userData);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteMovie = (movie_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteMovie(movie_id, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${userData.savedMovies.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {userData.savedMovies.map((movie) => {
            return (
              <Card key={movie._id} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Released: {movie.released}</p>
                  <p className='small'>Actors: {movie.actors}</p>
                  <p className='small'>Director: {movie.director}</p>
                  <p className='small'>Genre: {movie.genre}</p>
                  <p className='small'>Plot: {movie.plot}</p>
                  <p className='small'>Rated: {movie.rated}</p>
                  <p className='small'>Runtime: {movie.runtime}</p>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie._id)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default SavedMovies;
