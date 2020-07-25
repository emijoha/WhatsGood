import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faAsterisk, faStar } from '@fortawesome/free-solid-svg-icons';
import './style.css';

import UserInfoContext from '../../utils/UserInfoContext';

function SavedIconLinks() {

  const userData = useContext(UserInfoContext);
  userData.getUserData();
  
  return (
    <div className='saved-icon-group'>
      <div id="saved-icon-div">
        <a href='/saved_media'>
          <FontAwesomeIcon
            className='media-icon'
            id='neon-hover'
            icon={faAsterisk}
          />
        </a>
        <p id='media-count-sub'>
          {userData.savedMusic.length +
            userData.savedMovies.length +
            userData.savedGames.length +
            userData.savedBooks.length
          }
        </p>
      </div>
      <div id="saved-icon-div">
        <a href='/saved_music'>
          <FontAwesomeIcon
            className='media-icon'
            id='neon-hover'
            icon={faMusic}
          />
        </a>
        <p id='media-count-sub'>
          {userData.savedMusic.length}
        </p>
      </div>
      <div id="saved-icon-div">
        <a href='/saved_movies'>
          <FontAwesomeIcon
            className='media-icon'
            id='neon-hover'
            icon={faVideo}
          />
        </a>
        <p id='media-count-sub'>
          {userData.savedMovies.length}
        </p>
      </div>
      <div id="saved-icon-div">
        <a href='/saved_games'>
          <FontAwesomeIcon
            className='media-icon'
            id='neon-hover'
            icon={faGamepad}
          />
        </a>
        <p id='media-count-sub'>
          {userData.savedGames.length}
        </p>
      </div>
      <div id="saved-icon-div">
        <a href='/saved_books'>
          <FontAwesomeIcon
            className='media-icon'
            id='neon-hover'
            icon={faBookOpen}
          />
        </a>
        <p id='media-count-sub'>
          {userData.savedBooks.length}
        </p>
      </div>
    </div>
  );
}

export default SavedIconLinks;