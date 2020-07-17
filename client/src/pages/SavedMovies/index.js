import React, { useState, useEffect, useContext } from 'react';
import NotLoggedIn from '../../components/NotLoggedIn';
import { Jumbotron, Container, CardColumns, Card, Button, Form, Col } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import SavedCards from '../../components/SavedCards';
// savedMovies page does not currently use this component, left it as is for now
// ratings/review form shoudl be seperate component with its own state, with just bare necessities of props needed from savedMovies state/functionality

// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';

import * as API from '../../utils/API';
import AuthService from '../../utils/auth';

function SavedMovies() {
  const [reviewInput, setReviewInput] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(null);

  // set state to activate review form
  const [selectedMediaReview, setSelectedMediaReview] = useState('');
  const [selectedMediaRating, setSelectedMediaRating] = useState(0);


  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  console.log("this is the user data, ", userData);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const startReview = (media) => {
    console.log('media: ', media);

    setSelectedMediaReview(media);
  }

  const handleReviewFormSubmit = (event) => {
    event.preventDefault();

    console.log('hey dickhead');

    saveUserReview();
  }

  const saveUserReview = () => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let updateCriteria = {
      type: 'Movie',
      id: selectedMediaReview._id,
      review: reviewInput
    }
    console.log(updateCriteria);

    API.saveUserReview(updateCriteria, token)
      .then(() => setReviewInput(''))
      .then(() => setSelectedMediaReview(''))
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  }

  const startRating = (movie) => {
    console.log('movie: ', movie);

    setSelectedMediaRating(movie);
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
      type: 'Movie',
      id: selectedMediaRating._id,
      userRating: userRating
    }
    console.log(updateCriteria);

    API.saveUserRating(updateCriteria, token)
      .then(() => setUserRating(null))
      .then(() => setSelectedMediaRating(0))
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
            <SavedCards
              cardType='savedMovies'
              savedArray={userData.savedMovies}
              username={userData.username}
              userData={userData}
              startRating={startRating}
              selectedMediaRating={selectedMediaRating}
              handleRatingFormSubmit={handleRatingFormSubmit}
              setUserRating={setUserRating}
              setHover={setHover}
              hover={hover}
              userRating={userRating}
              startReview={startReview}
              selectedMediaReview={selectedMediaReview}
              handleReviewFormSubmit={handleReviewFormSubmit}
              reviewInput={reviewInput}
              setReviewInput={setReviewInput}
              handleDeleteMovie={handleDeleteMovie}
            />
          </Container>
        </> :
        <NotLoggedIn />
      }
    </>
  );
}

export default SavedMovies;
