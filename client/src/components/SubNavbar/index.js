import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import "./style.css";
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faBookOpen, faGamepad, faMusic, faAsterisk, faUserCircle, faInbox, faPencil, faUpload } from '@fortawesome/free-solid-svg-icons';
function SubNavbar({ cb, page }) {

  const userData = useContext(UserInfoContext);

  // useEffect(() => {
  //   userData.getUserData();
  // }, []);


  return (
    <div className='text-center' id="sub-navbar-menu">
      <Table>
        <tr id="table-row">
          <td id="sub-navbar-th">
            <button id="sub-nav-li" onClick={() => cb("all")}>
              <FontAwesomeIcon
                className='search-icon sidebar-icon'
                id='neon-hover'
                icon={faAsterisk}
              />
            </button>
          </td>
          {page === 'profile' &&
            <td id="sub-navbar-th">
              <button id="sub-nav-li" onClick={() => cb("favorites")}>
                <FontAwesomeIcon
                  className='search-icon sidebar-icon'
                  id='neon-hover'
                  icon={faStar}
                />
              </button>
            </td>}
          <td id="sub-navbar-th">
            <button id="sub-nav-li" onClick={() => cb("music")}>
              <FontAwesomeIcon
                className='search-icon sidebar-icon'
                id='neon-hover'
                icon={faMusic}
              />
            </button>
          </td>
          <td id="sub-navbar-th">
            <button id="sub-nav-li" onClick={() => cb("movie")}>
              <FontAwesomeIcon
                className='search-icon sidebar-icon'
                id='neon-hover'
                icon={faVideo}
              />
            </button>
          </td>
          <td id="sub-navbar-th">
            <button id="sub-nav-li" onClick={() => cb("game")}>
              <FontAwesomeIcon
                className='search-icon sidebar-icon'
                id='neon-hover'
                icon={faGamepad}
              />
            </button>
          </td>
          <td id="sub-navbar-th">
            <button id="sub-nav-li" onClick={() => cb("book")}>
              <FontAwesomeIcon
                className='search-icon sidebar-icon'
                id='neon-hover'
                icon={faBookOpen}
              />
            </button>
          </td>
        </tr>
      </Table>
    </div>
  );
}

export default SubNavbar;