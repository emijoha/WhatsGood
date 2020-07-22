import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import "./style.css";
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { CardBody } from 'react-bootstrap/Card';
import * as API from '../../utils/API';

function SideBar({ cb, page }) {
  const userData = useContext(UserInfoContext);

  useEffect(() => {
    userData.getUserData();
  }, []);

  return (
    <div id="side-bar-menu">
      <ul>
        <li><button id="side-bar-li" onClick={() => cb("all")}>ALL</button></li>
        {page === 'profile' && <li><button id="side-bar-li" onClick={() => cb("favorites")}>FAVORITES</button></li>}
        <li><button id="side-bar-li" onClick={() => cb("music")}>MUSIC</button></li>
        <li><button id="side-bar-li" onClick={() => cb("movie")}>MOVIES</button></li>
        <li><button id="side-bar-li" onClick={() => cb("game")}>GAMES</button></li>
        <li><button id="side-bar-li" onClick={() => cb("book")}>BOOKS</button></li>
      </ul>
    </div>
  );
}

export default SideBar;