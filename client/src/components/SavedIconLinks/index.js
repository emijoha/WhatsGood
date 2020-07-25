import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faAsterisk, faStar } from '@fortawesome/free-solid-svg-icons';
import './style.css';

import UserInfoContext from '../../utils/UserInfoContext';

function SavedIconLinks(props) {

  let music;
  let movies;
  let games;
  let books;

  if (props.type === 'friend') {
    music = props.music;
    movies = props.movies;
    games = props.games;
    books = props.books

    return (
      <div className='saved-icon-group'>
        <div id="saved-icon-div">
          <a>
            <FontAwesomeIcon
              className='media-icon'
              icon={faMusic}
            />
          </a>
          <p id='media-count-sub'>
            {music}
          </p>
        </div>
        <div id="saved-icon-div">
          <a>
            <FontAwesomeIcon
              className='media-icon'
              icon={faVideo}
            />
          </a>
          <p id='media-count-sub'>
            {movies}
          </p>
        </div>
        <div id="saved-icon-div">
          <a>
            <FontAwesomeIcon
              className='media-icon'
              icon={faGamepad}
            />
          </a>
          <p id='media-count-sub'>
            {games}
          </p>
        </div>
        <div id="saved-icon-div">
          <a>
            <FontAwesomeIcon
              className='media-icon'
              icon={faBookOpen}
            />
          </a>
          <p id='media-count-sub'>
            {books}
          </p>
        </div>
      </div>
    );
  } else {
    music = props.userData.savedMusic.length;
    movies = props.userData.savedMovies.length;
    games = props.userData.savedGames.length;
    books = props.userData.savedBooks.length;

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
            {music + movies + games + books}
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
            {music}
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
            {movies}
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
            {games}
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
            {books}
          </p>
        </div>
      </div>
    );
  }


}

export default SavedIconLinks;