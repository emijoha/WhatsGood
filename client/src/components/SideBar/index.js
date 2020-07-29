import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import "./style.css";
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { CardBody } from 'react-bootstrap/Card';
import * as API from '../../utils/API';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faBookOpen, faGamepad, faMusic, faAsterisk, faUserCircle, faInbox, faPencil, faUpload } from '@fortawesome/free-solid-svg-icons';



function SideBar({ cb, page, username }) {

  //   const [allFriendsMediaState, setAllFriendsMediaState] = useState([]);

  // const allFriendsMediaState = [];

  //   function compareTimeStamp(a, b) {
  //     return b.timeStamp - a.timeStamp;
  //   }

  // const userData = useContext(UserInfoContext);

  // useEffect(() => {
  //   userData.getUserData();
  // }, []);

  return (
    <div id="side-bar-menu">
      <ul>
        <li>
          <button id="side-bar-li" onClick={() => cb("all")}>
            ALL
            <FontAwesomeIcon
              className='sidebar-icon'
              id='purple-hover'
              icon={faAsterisk}
            />
          </button>
        </li>
        {page === 'profile' &&
          <li>
            <button id="side-bar-li" onClick={() => cb("favorites")}>
              FAVORITES
              <FontAwesomeIcon
                className='sidebar-icon'
                id='purple-hover'
                icon={faStar}
              />
            </button>
          </li>
        }
        <li>
          <button id="side-bar-li" onClick={() => cb("music")}>
            MUSIC
            <FontAwesomeIcon
              className='sidebar-icon'
              id='purple-hover'
              icon={faMusic}
            />
          </button>

        </li>
        <li>
          <button id="side-bar-li" onClick={() => cb("movie")}>
            MOVIES
            <FontAwesomeIcon
              className='sidebar-icon'
              id='purple-hover'
              icon={faVideo}
            />
          </button>

        </li>
        <li>
          <button id="side-bar-li" onClick={() => cb("game")}>
            GAMES
            <FontAwesomeIcon
              className='sidebar-icon'
              id='purple-hover'
              icon={faGamepad}
            />
          </button>
        </li>
        <li>
          <button id="side-bar-li" onClick={() => cb("book")}>
            BOOKS
            <FontAwesomeIcon
              className='sidebar-icon'
              id='purple-hover'
              icon={faBookOpen}
            />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;