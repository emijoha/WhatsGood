import React, { useState, useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Form, Col } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedMovies() {
  // const [reviewInput, setReviewInput] = useState('');
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  console.log(userData);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleSaveMovieReview = (event) => {
    event.preventDefault();
    console.log(`value: ${event.target.value}`);
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    // if (!reviewInput) {
    //   return false;
    // }

    API.saveMovieReview(event.target.value, token)
    // .then(() => setReviewInput(''))
    .then(() => userData.getUserData())
    .catch((err) => console.log(err));
  }

  // create function that accepts the movie's mongo _id value as param and deletes the movie from the database
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
                  <Form onSubmit={handleSaveMovieReview}>
                    <Form.Row>
                      <Col xs={12} md={8}>
                        <Form.Control
                          name='reviewInput'
                          // value=
                          // onChange={(e) => setReviewInput(e.target.value)}
                          type='text'
                          size='lg'
                          placeholder='Review this movie'
                        />
                      </Col>
                      <Col xs={12} md={4}>
                        <Button type='submit' variant='success' size='lg'>
                          Submit Review
                        </Button>
                      </Col>
                    </Form.Row>
                  </Form>
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
