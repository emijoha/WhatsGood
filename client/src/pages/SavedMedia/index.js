import React, { useContext, useState } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import './style.css';

// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';

import * as API from '../../utils/API';
import AuthService from '../../utils/auth';
import NotLoggedIn from '../../components/NotLoggedIn';
import SavedCards from '../../components/SavedCards';

function SavedMedia() {
  const [reviewInput, setReviewInput] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);

  // set state to activate review form
  const [selectedMediaReview, setSelectedMediaReview] = useState('');
  const [selectedMediaRating, setSelectedMediaRating] = useState(0);

  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

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
    <div id="container">
      {userData.username ?
        <div id="sub-container" >
          <div id="header-div">
           
          {userData.savedMusic.length === 0 && userData.savedMovies.length === 0 && userData.savedBooks.length === 0 && userData.savedGames.length === 0
                        ?  <div id="no-media-div">
                        <p><h5 className="text-center" id="header">LOOKS EMPTY IN HERE.</h5></p>
                        <p><h5 className="text-center" id="highlight-header">GO TO SEARCH AND ADD SOME MEDIA!</h5></p>
                        </div>
                        : <h5 className="text-center" id="header">MY MEDIA</h5>}
              
         
          </div>


         
          <Container>
            <SavedCards
              cardType='savedBooks'
              savedArray={userData.savedBooks}
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
              handleDeleteBook={handleDeleteBook}
            />

          
            <SavedCards
              cardType='savedMusic'
              savedArray={userData.savedMusic}
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
              handleDeleteMusic={handleDeleteMusic}
            />
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
            <SavedCards
              cardType='savedGames'
              savedArray={userData.savedGames}
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
              handleDeleteGame={handleDeleteGame}
            />
          </Container>
        </div> :
        <NotLoggedIn />}
    </div>
  );
}

export default SavedMedia;
