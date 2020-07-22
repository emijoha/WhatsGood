import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Container, Form, Button, Col, Row, Image } from 'react-bootstrap';

import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import * as API from '../../utils/API';
import FeedCard from '../../components/FeedCard';
import FriendProfileFeedCard from '../../components/FriendProfileFeedCard';
import SideBar from '../../components/SideBar';
import SubNavbar from '../../components/SubNavbar';
import './style.css';

function FriendProfile() {

  const userData = useContext(UserInfoContext);

  const [friendMediaState, setFriendMediaState] = useState([]);
  const [friendFavoritesState, setFriendFavoritesState] = useState([]);
  const [friend, setFriend] = useState([]);

  

  function compareTimeStamp(a, b) {
    return b.timeStamp - a.timeStamp;
  }

  const likerUsername = userData.username;

  useEffect(() => {
    setFriendMediaState([]);
    setFriendFavoritesState([]);
    renderAllMedia();
  }, [userData.username]);

  useEffect(() => {
    API.getUser('5f11d4549ad6b11dcf7693ac')
    .then((res) => {
      setFriend(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

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
      type: "like"
    }

    API.saveLike(likeData, token)
      .then(() => {
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
        userData.getUserData();
      })
      .catch(err => console.log(err));
  });

  const getSavedBookData = () => {
    friend.savedBooks.map(savedBook => {

      let savedBookData = {
        mediaType: savedBook.mediaType,
        timeStamp: savedBook.timeStamp,
        createdAt: savedBook.createdAt,
        _id: savedBook._id,
        mediaId: savedBook.mediaId,
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
        comments: savedBook.comments,
        userFavorite: savedBook.userFavorite
      }

      setFriendMediaState(friendMediaState => [...friendMediaState, savedBookData].sort(compareTimeStamp))

    })
  }

  const getSavedMusicData = () => {
    friend.savedMusic.map(savedMusic => {

      let savedMusicData = {
        mediaType: savedMusic.mediaType,
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
        comments: savedMusic.comments,
        userFavorite: savedMusic.userFavorite
      }

      setFriendMediaState(friendMediaState => [...friendMediaState, savedMusicData].sort(compareTimeStamp))
    })
  }

  const getSavedMovieData = () => {
    friend.savedMovies.map(savedMovie => {

      let savedMovieData = {
        mediaType: savedMovie.mediaType,
        timeStamp: savedMovie.timeStamp,
        createdAt: savedMovie.createdAt,
        _id: savedMovie._id,
        mediaId: savedMovie.mediaId,
        username: friend.username,
        picture: friend.picture,
        userId: friend.id,
        image: savedMovie.image,
        title: savedMovie.title,
        runtime: savedMovie.runtime,
        released: savedMovie.released,
        rated: savedMovie.rated,
        plot: savedMovie.plot,
        genre: savedMovie.genre,
        director: savedMovie.director,
        actors: savedMovie.actors,
        userRating: savedMovie.userRating,
        userReview: savedMovie.userReview,
        likes: savedMovie.likes,
        comments: savedMovie.comments,
        userFavorite: savedMovie.userFavorite
      }

      setFriendMediaState(friendMediaState => [...friendMediaState, savedMovieData].sort(compareTimeStamp))
    })
  }

  const getSavedGameData = () => {
    friend.savedGames.map(savedGame => {

      let savedGameData = {
        mediaType: savedGame.mediaType,
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
        comments: savedGame.comments,
        userFavorite: savedGame.userFavorite
      }

      setFriendMediaState(friendMediaState => [...friendMediaState, savedGameData].sort(compareTimeStamp))
    })
  }

  function renderAllMedia() {

    friend.savedBooks && getSavedBookData();

    friend.savedMusic && getSavedMusicData();

    friend.savedMovies && getSavedMovieData();

    friend.savedGames && getSavedGameData();

  }

  const handleRenderMediaPage = useCallback((mediaType) => {

    setFriendMediaState([]);
    setFriendFavoritesState([]);

    let favoritesArr = [];
    let savedMediaArr = [];

    switch (mediaType) {
      case "all":
        renderAllMedia();
        break;
      case "music":
        getSavedMusicData();
        break;
      case "game":
        getSavedGameData();
        break;
      case "movie":
        getSavedMovieData();
        break;
      case "book":
        getSavedBookData();
        break;
      default:
        if (mediaType === "favorites") {
          savedMediaArr = [...savedMediaArr, friend.savedBooks, friend.savedGames, friend.savedMovies, friend.savedMusic];

          savedMediaArr.map(savedMedia => {
            savedMedia.filter(media => {
              if (media.userFavorite) {
                favoritesArr.push(media);
              }
            })
          })

          setFriendFavoritesState(favoritesArr.sort(compareTimeStamp));
        }
        return;
    }
  })

  return (
    <>
      <Container fluid id="profile-container">
        <Row id="profile-row">
          <Col md={3} className="justify-content-center">
            <div>
              <Image
                src={friend.picture}
                alt={`${friend.username}'s face, probably`}
                roundedCircle
                className='img-fluid'
              />
              {friend.bio &&
                <div>
                  <h6>
                    A little about me:
                </h6>
                  <p>
                    {friend.bio}
                  </p>
                </div>
              }
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <Col>
                <SubNavbar xs={12} s={12} md={12} lg={0} cb={handleRenderMediaPage} page={'profile'} username={friend.username} />
              </Col>
            </Row>
            <Container width="100%">
              <Row id="main-body-row">
                <Col id="side-bar-column" className="text-right" xs={0} s={0} md={1} lg={3}>
                  <SideBar
                    cb={handleRenderMediaPage}
                    page={'profile'}
                    username={friend.username} 
                  />
                </Col>
                <Col id="media-feed-column" xs={12} s={12} md={10} lg={6} >
                  {friendMediaState.map(media => {
                    return (
                      <FriendProfileFeedCard
                        mediaType={media.mediaType.toLowerCase()}
                        media={media}
                        cb={handleSaveLike}
                        userData={userData}
                      />
                      // <FeedCard
                      //   mediaType='book'
                      //   media={media}
                      //   cb={handleSaveLike}
                      //   userData={userData}
                      // >
                    );
                    return;
                  })}
                  {friendFavoritesState.map(media => {
                    return (
                      <FeedCard
                        media={media}
                        userData={friend}
                      />
                    )
                  })
                  }
                </Col>
                <Col xs={0} s={0} md={1} lg={3}>

                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FriendProfile;