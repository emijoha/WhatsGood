import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function SearchIconGroup() {

  return (
    <p className='search-icon-group'>
      <a href='/search_music'>
        <FontAwesomeIcon
          className='search-icon'
          id='neon-hover'
          icon={faMusic}
        />
      </a>
      <a href='/search_movies'>
        <FontAwesomeIcon
          className='search-icon'
          id='neon-hover'
          icon={faVideo}
        />
      </a>
      <a href='/search_games'>
        <FontAwesomeIcon
          className='search-icon'
          id='neon-hover'
          icon={faGamepad}
        />
      </a>
      <a href='/search_books'>
        <FontAwesomeIcon
          className='search-icon'
          id='neon-hover'
          icon={faBookOpen}
        />
      </a>
      <a href='/search_user'>
        <FontAwesomeIcon
          className='search-icon'
          id='neon-hover'
          icon={faUserFriends}
        />
      </a>
    </p>
  )
}

export default SearchIconGroup;