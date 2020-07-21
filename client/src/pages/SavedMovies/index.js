import React, { useState, useEffect, useContext } from 'react';
import NotLoggedIn from '../../components/NotLoggedIn';
import { Jumbotron, Container } from 'react-bootstrap';
import SavedCards from '../../components/SavedCards';
import './style.css';
// savedMovies page does not currently use this component, left it as is for now
// ratings/review form shoudl be seperate component with its own state, with just bare necessities of props needed from savedMovies state/functionality

// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';

import * as API from '../../utils/API';
import AuthService from '../../utils/auth';

function SavedMovies() {
  const [reviewInput, setReviewInput] = useState('');
  const [userRating, setUserRating] = useState(0);
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

  const makeFavorite = (media) => {
    console.log('from SavedMovies: ', media);

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let isFavorite;
    
    if (media.userFavorite === true) {
      isFavorite = false;
    } else {
      isFavorite = true;
    }

    let updateCriteria = {
      type: media.mediaType,
      id: media._id,
      favorite: isFavorite
    }

    console.log('updateCriteria: ', updateCriteria);

    API.makeFavorite(updateCriteria, token)
    .then(() => userData.getUserData())
    .catch((err) => console.log(err));
  }

  const startReview = (media) => {
    console.log('media: ', media);

    setSelectedMediaReview(media);
  }

  const handleReviewFormSubmit = (event) => {
    event.preventDefault();

    saveUserReview();
  }

  const saveUserReview = () => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let updateCriteria = {
      type: selectedMediaReview.mediaType,
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

  const startRating = (media) => {
    console.log('movie: ', media);

    setSelectedMediaRating(media);
  }

  const handleRatingFormSubmit = (event) => {
    event.preventDefault();

    saveUserRating();
  }

  const saveUserRating = () => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let updateCriteria = {
      type: selectedMediaRating.mediaType,
      id: selectedMediaRating._id,
      userRating: userRating
    }
    console.log(updateCriteria);

    API.saveUserRating(updateCriteria, token)
      .then(() => setUserRating(0))
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
    <div id="container">
      {userData.username ?
        <div>
            <div id="header-div">
           
           {userData.savedMovies.length === 0
                         ?  <div id="no-media-div">
                         <p><h5 className="text-center" id="header">LOOKS EMPTY IN HERE.</h5></p>
                         <p><h5 className="text-center" id="highlight-header">GO TO SEARCH AND ADD SOME MOVIES!</h5></p>
                         </div>
                         : <h5 className="text-center" id="header">MY MOVIES</h5>}
               
          
           </div>
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
              makeFavorite={makeFavorite}
              handleDeleteMovie={handleDeleteMovie}
            />
          </Container>
        </div> :
        <NotLoggedIn />
      }
    </div>
  );
}

export default SavedMovies;
