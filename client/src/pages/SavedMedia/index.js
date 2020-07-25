import React, { useContext, useState } from 'react';
import { Jumbotron, Container, Row, Col, CardColumns } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faAsterisk, faSearch } from '@fortawesome/free-solid-svg-icons';
import SavedIconLinks from '../../components/SavedIconLinks';
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
      <Row>
        <Container>
          <Row>
            <Col xs={0} s={0} md={1} lg={2}></Col>
            <Col xs={12} s={12} md={10} lg={8}>
              <div id="sub-container" >
                <div id="header-div">
                  <h5 className="text-center" id="media-header">
                    MY MEDIA
                  </h5>
                  <SavedIconLinks></SavedIconLinks>
                </div>
              </div>
            </Col>
            <Col xs={0} s={0} md={1} lg={2}></Col>
          </Row>
          <hr></hr>
        </Container>
      </Row>
      <Container>
        <a className='muted-subtext' id='neon-hover' href='/search_music'>
          <div className="empty-message">
            Add media to your collections
            <FontAwesomeIcon
              className='search-icon-media'
              icon={faSearch}
            />
          </div>
        </a>
        <CardColumns>
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
        </CardColumns>
        {/* ITS BUGGY */}
        {/* {!userData.username
          ? <NotLoggedIn />
          : null
        } */}
      </Container>
    </div >
  );
}

export default SavedMedia;
