import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import "./style.css";
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { CardBody } from 'react-bootstrap/Card';
import * as API from '../../utils/API';



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

  //   const setNewMediaState = () => {



  //         console.log("allFriendsMediaState, ", allFriendsMediaState.sort(compareTimeStamp))
  //         cb()



  //   }

  //   const mediaType = {
  //     mediaType: "music",
  //     timeStamp: 1594766646772,
  //     createdAt: "Tue Jul 14 2020 18:44:06 GMT-0400 (Eastern Daylight Time)",
  //     _id: "5f0e353bc6604a7d252b2d24",
  //     username: "c",
  //     picture: "https://res.cloudinary.com/dxrhczeo9/image/upload/v1594764862/enfrotau2buecc6nct8p.png",
  //     userId: "5f0e24ca9c76a4765b365076",
  //     image: "https://cdns-images.dzcdn.net/images/cover/d6c8f9ae565a5579a21bf45e2fa62753/500x500-000000-80-0-0.jpg",
  //     title: "Unravel",
  //     link: "https://www.deezer.com/track/488547832",
  //     artist: "Björk",
  //     preview: "https://cdns-preview-9.dzcdn.net/stream/c-9638b663d9c9c714ed6b72f8fb42ce0a-7.mp3",
  //     likes: 2
  //   }



  return (


    // <div id="side-bar" className="text-right">
    <div id="side-bar-menu">
      <ul>

        <li id="side-header-li"><h5>WHAT'S</h5></li>
        <li id="side-header-li"><h5>GOOD</h5></li>

        {/*.toUpperCase() cannot read numbers; maybe leave this as just username?*/}
        <li id="side-header-li"><h5>{username}?</h5></li>
        {/* <li id="side-header-li"><h5>{username.toUpperCase()}?</h5></li> */}
      </ul>
      <ul>
        <li><button id="side-bar-li" onClick={() => cb("all")}>ALL</button></li>
        {page === 'profile' && <li><button id="side-bar-li" onClick={() => cb("favorites")}>FAVORITES</button></li>}
        <li><button id="side-bar-li" onClick={() => cb("music")}>MUSIC</button></li>
        <li><button id="side-bar-li" onClick={() => cb("movie")}>MOVIES</button></li>
        <li><button id="side-bar-li" onClick={() => cb("game")}>GAMES</button></li>
        <li><button id="side-bar-li" onClick={() => cb("book")}>BOOKS</button></li>

      </ul>
    </div>
    // </div >









  );
}

export default SideBar;