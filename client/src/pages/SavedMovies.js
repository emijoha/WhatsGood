import React, { useState, useContext } from 'react';
import NotLoggedIn from '../components/NotLoggedIn/NotLoggedIn';
import { Jumbotron, Container, CardColumns, Card, Button, Form, Col } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';
import './style.css';

function SavedMovies() {
  const [reviewInput, setReviewInput] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(null);

  // set state to activate review form
  const [selectedMovieReview, setSelectedMovieReview] = useState('');
  const [selectedMovieRating, setSelectedMovieRating] = useState('');


  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  console.log("this is the user data, ", userData);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database

  const startReview = ({ movie }) => {
    console.log('movie: ', movie);

    setSelectedMovieReview(movie);
  }

  const handleReviewFormSubmit = (event) => {
    event.preventDefault();

    console.log('hey dickhead');

    saveMovieReview();
  }

  const saveMovieReview = () => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let updateCriteria = {
      id: selectedMovieReview._id,
      review: reviewInput
    }
    console.log(updateCriteria);

    API.saveMovieReview(updateCriteria, token)
      .then(() => setReviewInput(''))
      .then(() => setSelectedMovieReview(''))
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  }

  const startRating = ({ movie }) => {
    console.log('movie: ', movie);

    setSelectedMovieRating(movie);
  }

  const handleRatingFormSubmit = (event) => {
    event.preventDefault();

    console.log('hey asshole');

    saveUserRating();
  }

  const saveUserRating = () => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let updateCriteria = {
      id: selectedMovieRating._id,
      userRating: userRating
    }
    console.log(updateCriteria);

    API.saveUserRating(updateCriteria, token)
      .then(() => setUserRating(null))
      .then(() => setSelectedMovieRating(''))
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
      {userData.username ?
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
                      <p className='bold'>Your Rating:
                      {[...Array(movie.userRating)].map((star, i) => {
                        return (
                          <label>
                            <FaVideo key={movie.userRating} className='read-only-star' color='black' size={30} />
                          </label>
                        )
                      })}
                      </p>

                      {userData.username && (
                        <>
                          {userData.savedMovies?.some((savedMovie) => savedMovie.userRating) ?
                            <Button className='btn-block btn-success' onClick={() => startRating({ movie })}  >
                              Update your Rating?
                            </Button>

                            :

                            <Button className='btn-block btn-success' onClick={() => startRating({ movie })}  >
                              Rate this Movie!
                            </Button>
                          }
                        </>
                      )}
                      <br></br>

                      {selectedMovieRating._id && (
                        <>
                          {movie._id === selectedMovieRating._id
                            ?
                            <Form onSubmit={handleRatingFormSubmit}>
                              {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                  <label>
                                    <input type='radio' name='rating'
                                      value={i} onClick={() => setUserRating(ratingValue)} />
                                    <FaVideo key={ratingValue} className='star' onMouseEnter={() => setHover(ratingValue)}
                                      onMouseLeave={() => setHover(null)} color={ratingValue <= (hover || userRating) ? 'black' : '#e4e5e9'} size={30} />
                                  </label>
                                )
                              })}

                              <Col>
                                <Button type='submit' variant='success' size='md'>
                                  Submit Rating
                                </Button>
                              </Col>
                            </Form>
                            : null
                          }
                        </>

                      )}

                      <p className='bold'>Your Review: {movie.movieReview}</p>

                      {userData.username && (
                        <>
                          {userData.savedMovies?.some((savedMovie) => savedMovie.movieReview) ?
                            <Button className='btn-block btn-success' onClick={() => startReview({ movie })}  >
                              Update your Review?
                            </Button>

                            :

                            <Button className='btn-block btn-success' onClick={() => startReview({ movie })}  >
                              Review this Movie!
                            </Button>
                          }
                        </>
                      )}

                      {selectedMovieReview._id && (
                        <>
                          {movie._id === selectedMovieReview._id
                            ?
                            <Form onSubmit={handleReviewFormSubmit}>
                              <Col>
                                <Form.Control
                                  name='reviewInput'
                                  value={reviewInput}
                                  onChange={(e) => setReviewInput(e.target.value)}
                                  type='text'
                                  size='md'
                                  as='textarea'
                                  rows='6'
                                  placeholder='Review this movie'
                                />
                              </Col>
                              <Col>
                                <Button type='submit' variant='success' size='md'>
                                  Submit Review
                                </Button>
                              </Col>
                            </Form>

                            : null
                          }
                        </>
                      )}

                      

                      <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie._id)}>
                        Delete this Movie!
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </> :
        <NotLoggedIn />
      }
    </>
  );
}

export default SavedMovies;
