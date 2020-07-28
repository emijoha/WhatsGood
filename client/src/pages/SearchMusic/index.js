import React, { useState, useContext, useCallback } from 'react';
import { Jumbotron, Row, Container, Col, Form, Button } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import SearchCards from '../../components/SearchCards';
import SearchIconGroup from '../../components/SearchIconGroup';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { saveMusic, searchMusic } from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function SearchMusic() {
  // create state for holding returned google api data
  const [searchedMusic, setSearchedMusic] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const [validSearch, setValidSearch] = useState(true);

  const userData = useContext(UserInfoContext);

  // create method to search for books and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    searchMusic(searchInput)
      .then(({ data }) => {
        console.log("SEARCH MUSIC DATA", data.data[0]);
        if(data.data[0] === undefined){
          return setValidSearch(false);
        }
        const musicData = data.data.map((music) => ({
          mediaId: music.id.toString(),
          timeStamp: Date.now(),
          createdAt: Date(),
          title: music.title || ['No title to display'],
          artist: music.artist.name || ['No artist to display'],
          link: music.link,
          preview: music.preview,
          image: music.album.cover_big || '',
        }));
        console.log(musicData);

        setSearchedMusic(musicData);
        setValidSearch(true);
      })
      .then(() => setSearchInput(''))
      .catch((err) => console.log(err));
  };

  // create function to handle saving a book to our database
  const handleSaveMedia = useCallback((music, userRating, userReview) => {
    // find the book in `searchedBooks` state by the matching id
    const musicToSave = {
      username: userData.username,
      userId: userData._id,
      mediaType: "music",
      mediaId: music.mediaId,
      timeStamp: Date.now(),
      createdAt: Date(),
      title: music.title || ['No title to display'],
      artist: music.artist || ['No artist to display'],
      link: music.link,
      preview: music.preview,
      image: music.image || '',
      userRating: userRating,
      userReview: userReview
    }

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    // send the books data to our api
    saveMusic(musicToSave, token)
      .then(() => {
        userData.getUserData()
        console.log(userData.savedMusic)
      }
      )
      .catch((err) => console.log(err));
  });

  return (
    <div id="container">
      <Row>
        <Container >
          <Row>
            <Col xs={0} s={0} md={1} lg={2}></Col>
            <Col id='search-wrap' xs={12} s={12} md={10} lg={8}>
              <h5 id="search-heading">SEARCH MUSIC</h5>
              <div id='form-hugger'>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Control
                    id="api-search-input"
                    name='searchInput'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type='text'
                    size='lg'
                    placeholder='Search for music'
                  />
                  <SearchIconGroup />
                  <Button id="form-search-btn" type='submit' size='lg'>
                    SEARCH
                </Button>
                </Form>
              </div>
            </Col>
            <Col xs={0} s={0} md={1} lg={2}></Col>
          </Row>
          <hr></hr>
        </Container>
      </Row>
      <Container>
        {validSearch ?
          <SearchCards
          cardType='searchedMusic'
          resultArray={searchedMusic}
          savedArray={userData.savedMusic}
          username={userData.username}
          cb={handleSaveMedia}
        />
        : <h2>Sorry, we could not find any music that matched your search.</h2>}
      </Container>
    </div>
  );
}

export default SearchMusic;
