import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import "./style.css";

// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import * as API from '../../utils/API';

import FeedCard from '../../components/FeedCard';
import SideBar from '../../components/SideBar';
import SubNavbar from '../../components/SubNavbar';


function Home() {

  const [allFriendsMediaState, setAllFriendsMediaState] = useState([]);

  function compareTimeStamp(a, b) {
    return b.timeStamp - a.timeStamp;
  }

  const userData = useContext(UserInfoContext);
  console.log("userDATA:  ", userData);

  // to pass into notifications so user knows who liked something
  // const likerId = userData._id;
  const likerUsername = userData.username;

  useEffect(() => {
    renderAllMedia();
  }, [userData.username]);

  function renderAllMedia() {
    userData.friends.map(friend => {
      API.getUser(friend.id)
        .then(result => {
          if (result.data.savedBooks.length > 0) {
            result.data.savedBooks.map(savedBook => {
              let savedBookData = {
                mediaType: "book",
                timeStamp: savedBook.timeStamp,
                createdAt: savedBook.createdAt,
                _id: savedBook._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedBook.image,
                title: savedBook.title,
                authors: savedBook.authors,
                description: savedBook.description,
                userRating: savedBook.userRating,
                userReview: savedBook.userReview,
                likes: savedBook.likes,
                comments: savedBook.comments
              }
              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedBookData].sort(compareTimeStamp))
            })
          }
          if (result.data.savedMusic.length > 0) {
            result.data.savedMusic.map(savedMusic => {
              let savedMusicData = {
                mediaType: "music",
                timeStamp: savedMusic.timeStamp,
                createdAt: savedMusic.createdAt,
                _id: savedMusic._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedMusic.image,
                title: savedMusic.title,
                link: savedMusic.link,
                artist: savedMusic.artist,
                preview: savedMusic.preview,
                userRating: savedMusic.userRating,
                userReview: savedMusic.userReview,
                likes: savedMusic.likes,
                comments: savedMusic.comments
              }
              console.log("this is savedBookData: ", savedMusicData)
              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedMusicData].sort(compareTimeStamp))
            })
          }
          if (result.data.savedMovies.length > 0) {
            result.data.savedMovies.map(savedMovie => {
              let savedMovieData = {
                mediaType: "movie",
                timeStamp: savedMovie.timeStamp,
                createdAt: savedMovie.createdAt,
                _id: savedMovie._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedMovie.image,
                title: savedMovie.title,
                runtime: savedMovie.runtime,
                release: savedMovie.released,
                rated: savedMovie.rated,
                plot: savedMovie.plot,
                genre: savedMovie.genre,
                director: savedMovie.director,
                actors: savedMovie.actors,
                userRating: savedMovie.userRating,
                userReview: savedMovie.userReview,
                likes: savedMovie.likes,
                comments: savedMovie.comments
              }
              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedMovieData].sort(compareTimeStamp))
            })
          }
          if (result.data.savedGames.length > 0) {
            result.data.savedGames.map(savedGame => {
              let savedGameData = {
                mediaType: "game",
                timeStamp: savedGame.timeStamp,
                createdAt: savedGame.createdAt,
                _id: savedGame._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedGame.image,
                title: savedGame.title,
                developer: savedGame.developer,
                description: savedGame.description,
                userRating: savedGame.userRating,
                userReview: savedGame.userReview,
                likes: savedGame.likes,
                comments: savedGame.comments
              }
              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedGameData].sort(compareTimeStamp))
            })
          }
        })
    })
  }
  const handleRenderMediaPage = useCallback((mediaType) => {

    setAllFriendsMediaState([]);

    if (mediaType === "all") {
      renderAllMedia();
    }
    if (mediaType === "music") {

      userData.friends.map(friend => {
        API.getUser(friend.id)
          .then(result => {

            result.data.savedMusic.map(savedMusic => {

              let savedMusicData = {
                mediaType: "music",
                timeStamp: savedMusic.timeStamp,
                createdAt: savedMusic.createdAt,
                _id: savedMusic._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedMusic.image,
                title: savedMusic.title,
                link: savedMusic.link,
                artist: savedMusic.artist,
                preview: savedMusic.preview,
                userRating: savedMusic.userRating,
                userReview: savedMusic.userReview,
                likes: savedMusic.likes,
                comments: savedMusic.comments

              }

              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedMusicData].sort(compareTimeStamp))

            })
          })
      })
    }

    if (mediaType === "game") {

      userData.friends.map(friend => {
        API.getUser(friend.id)
          .then(result => {

            result.data.savedGames.map(savedGame => {

              let savedGameData = {
                mediaType: "game",
                timeStamp: savedGame.timeStamp,
                createdAt: savedGame.createdAt,
                _id: savedGame._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedGame.image,
                title: savedGame.title,
                developer: savedGame.developer,
                description: savedGame.description,
                userRating: savedGame.userRating,
                userReview: savedGame.userReview,
                likes: savedGame.likes,
                comments: savedGame.comments
              }
              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedGameData].sort(compareTimeStamp))
            })
          })
      })
    }

    if (mediaType === "movie") {

      userData.friends.map(friend => {
        API.getUser(friend.id)
          .then(result => {

            result.data.savedMovies.map(savedMovie => {

              let savedMovieData = {
                mediaType: "movie",
                timeStamp: savedMovie.timeStamp,
                createdAt: savedMovie.createdAt,
                _id: savedMovie._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedMovie.image,
                title: savedMovie.title,
                runtime: savedMovie.runtime,
                release: savedMovie.released,
                rated: savedMovie.rated,
                plot: savedMovie.plot,
                genre: savedMovie.genre,
                director: savedMovie.director,
                actors: savedMovie.actors,
                userRating: savedMovie.userRating,
                userReview: savedMovie.userReview,
                likes: savedMovie.likes,
                comments: savedMovie.comments
              }

              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedMovieData].sort(compareTimeStamp))

            })
          })
      })
    }

    if (mediaType === "book") {

      userData.friends.map(friend => {
        API.getUser(friend.id)
          .then(result => {

            result.data.savedBooks.map(savedBook => {

              let savedBookData = {
                mediaType: "book",
                timeStamp: savedBook.timeStamp,
                createdAt: savedBook.createdAt,
                _id: savedBook._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedBook.image,
                title: savedBook.title,
                authors: savedBook.authors,
                description: savedBook.description,
                userRating: savedBook.userRating,
                userReview: savedBook.userReview,
                likes: savedBook.likes,
                comments: savedBook.comments
              }

              console.log("this is savedBookData: ", savedBookData)
              console.log("this is savedBook: ", savedBook)

              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedBookData].sort(compareTimeStamp))

            })
          })
      })
    }
  })

  const handleSaveLike = useCallback((likeMediaType, like_id, mediaLikes, ownerId, title) => {
    // find the friend in `searchedUser` state by the matching id
    // const userToSave = searchedUser.find((user) => user._id === userId);
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }

    let likeData = {
      mediaType: likeMediaType,
      mediaId: like_id,
    }

    let addLikeData = {
      mediaType: likeMediaType,
      _id: like_id,
      likes: mediaLikes
    }

    // info for notification
    const notificationData = {
      likerUsername: likerUsername,
      title: title,
      ownerId: ownerId,
      type: "like",
      mediaId: like_id,
      mediaType: likeMediaType
    }

    API.saveLike(likeData, token)
      .then(() => {
        console.log("Token: ", token, "likeData: ", likeData);
        userData.getUserData();
      })
      .catch((err) => console.log(err));

    API.addLike(addLikeData, token)
      .then(() => {
        userData.getUserData();
      })
      .catch((err) => console.log(err));

    //call to send notification to user  
    API.addNotification(notificationData, token)
      .then(() => {
        console.log("NOTIFICATION ADDED");
        userData.getUserData();
      })
      .catch(err => console.log(err));
  });

  return (
    <>
      {/* <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing friends Media!</h1>
        </Container>
      </Jumbotron> */}
     <Row>
        <Col>
          <SubNavbar xs={12} s={12} md={12} lg={0} cb={handleRenderMediaPage} page='home'/>
        </Col>
      </Row>
      <Container width="100%">
        <Row id="main-body-row">
          <Col id="side-bar-column" className="text-right" xs={0} s={0} md={1} lg={3}>
            <SideBar
              cb={handleRenderMediaPage}
            />
          </Col>
          <Col id="media-feed-column" xs={12} s={12} md={10} lg={6} >
          {console.log("allfriendsmediaState in the return", allFriendsMediaState)}
            {allFriendsMediaState.map(media => {
              if (media.mediaType === "book") {
                return (
                  <FeedCard
                    mediaType='book'
                    media={media}
                    cb={handleSaveLike}
                    userData={userData}
                  />
                );
              }
              if (media.mediaType === "music") {
                return (
                  <FeedCard
                    mediaType='music'
                    media={media}
                    cb={handleSaveLike}
                    userData={userData}
                  />
                );
              }
              if (media.mediaType === "movie") {
                return (
                  <FeedCard
                    mediaType='movie'
                    media={media}
                    cb={handleSaveLike}
                    userData={userData}
                  />
                );
              }
              if (media.mediaType === "game") {
                return (
                  <FeedCard
                    mediaType='game'
                    media={media}
                    cb={handleSaveLike}
                    userData={userData}
                  />
                );
              }
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;





