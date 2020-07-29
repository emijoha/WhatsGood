import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Card, Container, Form, Button, Col, Row, Image, Spinner } from 'react-bootstrap';

import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import * as API from '../../utils/API';
import FeedCard from '../../components/FeedCard';
import FriendProfileFeedCard from '../../components/FriendProfileFeedCard';
import SideBar from '../../components/SideBar';
import SubNavbar from '../../components/SubNavbar';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faAsterisk, faUserCircle, faInbox, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function FriendProfile() {

  const userData = useContext(UserInfoContext);

  const [friendMediaState, setFriendMediaState] = useState([]);
  const [friendFavoritesState, setFriendFavoritesState] = useState([]);
  const [friend, setFriend] = useState([]);
  const [queryStringUsername, setQueryStringUsername] = useState('');
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setQueryStringUsername(window.location.search.split('=')[1]);
    API.searchFriend(queryStringUsername)
      .then((res) => {
        setFriend(res.data);
      })
      .catch((err) => console.log(err));
  }, [queryStringUsername !== window.location.search.split('=')[1]]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [friendMediaState, friendFavoritesState]);

  useEffect(() => {
    setFriendMediaState([]);
    setFriendFavoritesState([]);
    renderAllMedia();
  }, [friend]);

  function compareTimeStamp(a, b) {
    return b.timeStamp - a.timeStamp;
  }

  const likerUsername = userData.username;

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
    setLoadingState(true);

    friend.savedBooks && getSavedBookData();
    setLoadingState(true);

    friend.savedMusic && getSavedMusicData();
    setLoadingState(true);

    friend.savedMovies && getSavedMovieData();
    setLoadingState(true);

    friend.savedGames && getSavedGameData();
    setLoadingState(false);
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
      <Row>
        <Col>
          <SubNavbar xs={12} s={12} md={12} lg={0} cb={handleRenderMediaPage} page={'profile'} username={friend.username} />
        </Col>
      </Row>
      <Container width="100%">
        <Row>
          <Col xs={0} s={0} md={0} lg={2}></Col>
          <Col xs={12} s={12} md={12} lg={8} >
            <Card id='profile-card' key={userData.username}>
              <Card.Body id='profile-card-body'>
                <br></br>
                <div id='profile-image'>
                  <Card.Img
                    src={friend.picture}
                    alt={`${friend.username}'s face, probably`}
                    roundedCircle
                    className='img-fluid'
                    id='my-profile-pic'
                  ></Card.Img>
                </div>
                <div id='profile-info'>
                  <Card.Title id='user-title'>
                    <b>{friend.username}</b>
                  </Card.Title>
                  {userData.username && (
                    <>
                      {(friend.bio !== '' || null)
                        ?
                        <div>
                          <p className='about-me' id='purple'>
                            ABOUT ME
                          </p>
                          <div id='bio-scroll'>
                            {friend.bio}
                          </div>
                          <div className='prof-icon-wrap' >
                            <a href='/messages'>
                              <FontAwesomeIcon
                                className='prof-page-icon neon-hover'
                                id='mail-friend-icon'
                                icon={faPaperPlane}
                              />
                            </a>
                            <span id='mail-friend-text'>SEND A MESSAGE</span>

                          </div>
                        </div>
                        :
                        <>
                          <p className='about-me' id='purple'>
                            ABOUT ME
                          </p>
                          <div className='pr-4' id='bio-scroll'>
                            What's good? Not this bio! This user has not submitted a bio yet.
                          </div>
                          <div className='prof-icon-wrap' >
                            <a href='/messages'>
                              <FontAwesomeIcon
                                className='prof-page-icon neon-hover'
                                id='mail-friend-icon'
                                icon={faPaperPlane}
                              />
                            </a>
                            <span id='mail-friend-text'>SEND A MESSAGE</span>

                          </div>
                        </>
                      }
                    </>
                  )}
                  {/* <Button
                    className='btn'
                    id='purple-back'
                    href='/messages'
                  >MESSAGES</Button> */}
                  {/* <Card.Title id='user-states'>
                  <p>
                  <span>{userData.bookCount}</span> Books 
                  <span>, {userData.musicCount}</span> Music 
                  <span>{userData.movieCount}</span> Movies 
                  <span>, {userData.gameCount}</span> Games 
                  </p>
                </Card.Title> */}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={0} s={0} md={0} lg={2}></Col>
        </Row>
        <hr></hr>
      </Container>

      <Container width="100%">
        <Row id="prof-body-row">
          <Col id="side-bar-column" className="text-right" xs={0} s={0} md={1} lg={3}>
            <SideBar
              cb={handleRenderMediaPage}
              page={'profile'}
              username={friend.username}
            />
          </Col>
          <Col id="media-feed-column2" xs={12} s={12} md={10} lg={6} >

            {loadingState
              ?
              <div className="text-center">
                <Spinner animation="border" />
              </div>
              :
              <div>
                {
                  (friendMediaState.length === 0 && friendFavoritesState.length === 0)
                    ?
                    <div className='text-center empty-content' id='neon-hover'>
                      <a className="muted-subtext2" id='neon-hover' href='/message'>
                        {friend.username} hasn't saved to this collection
                      <FontAwesomeIcon
                          className='search-icon-media'
                          icon={faPaperPlane}
                        />
                        <p className='muted-logo special-font'>ASK WHAT'S GOOD?</p>
                      </a>
                    </div>
                    :
                    <div>
                      {friendMediaState.map(media => {
                        return (
                          <FriendProfileFeedCard
                            mediaType={media.mediaType.toLowerCase()}
                            media={media}
                            cb={handleSaveLike}
                            userData={userData}
                          />
                        );
                      })}
                      {friendFavoritesState.map(media => {
                        return (
                          <FeedCard
                            media={media}
                            userData={friend}
                          />
                        )
                      })}
                    </div>
                }
              </div>
            }

          </Col>
          {/* <Col xs={0} s={0} md={1} lg={3}>

          </Col> */}
        </Row>
      </Container>

    </>
  )
}

export default FriendProfile;