import React, { useContext, useState } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
// import ReactAudioPlayer from 'react-audio-player';
import SavedCards from '../../components/SavedCards';
import NotLoggedIn from '../../components/NotLoggedIn';

// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';

import * as API from '../../utils/API';
import AuthService from '../../utils/auth';

function SavedMusic() {
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

  const startRating = (music) => {
    console.log('movie: ', music);

    setSelectedMediaRating(music);
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
  const handleDeleteMusic = (music_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteMusic(music_id, token)
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
              <h1>Viewing saved music!</h1>
            </Container>
          </Jumbotron>
          <Container>
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
              handleDeleteMusic={handleDeleteMusic}
            />
          </Container>
        </> :
        <NotLoggedIn />}
    </>
  );
}

export default SavedMusic;
