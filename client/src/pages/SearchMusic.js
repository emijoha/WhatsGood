import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import SearchCards from '../components/SearchCards';
import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { saveMusic, searchMusic } from '../utils/API';

function SearchMusic() {
  // create state for holding returned google api data
  const [searchedMusic, setSearchedMusic] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const userData = useContext(UserInfoContext);

  // create method to search for books and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    searchMusic(searchInput)
      .then(({ data }) => {
        const musicData = data.data.map((music) => ({
          musicId: music.id,
          timeStamp: Date.now(),
          createdAt: Date(),
          title: music.title || ['No title to display'],
          artist: music.artist.name || ['No artist to display'],
          link: music.link,
          preview: music.preview,
          image: music.album.cover_big || '',
        }));
        console.log(musicData);

        return setSearchedMusic(musicData);
      })
      .then(() => setSearchInput(''))
      .catch((err) => console.log(err));
  };

  // create function to handle saving a book to our database
  const handleSaveMusic = (musicId) => {
    // find the book in `searchedBooks` state by the matching id
    const musicToSave = searchedMusic.find((music) => music.musicId === musicId);

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
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Music!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
      <Container>
        <SearchCards
          cardType='searchedMusic'
          resultArray={searchedMusic}
          savedArray={userData.savedMusic}
          username={userData.username}
          handleSaveMusic={handleSaveMusic}
        />
      </Container>
    </>
  );
}

export default SearchMusic;
