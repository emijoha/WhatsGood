import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import NotLoggedIn from '../components/NotLoggedIn/NotLoggedIn';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedMusic() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteMusic = (music_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteMusic(music_id, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      {userData.username ?
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Viewing saved music!</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2>
              {userData.savedMusic.length
                ? `Viewing ${userData.savedMusic.length} saved ${userData.savedMusic.length === 1 ? 'music' : 'music'}:`
                : 'You have no saved music!'}
            </h2>
            <CardColumns>
              {userData.savedMusic.map((music) => {
                return (
                  <Card key={music._id} border='dark'>
                    {music.image ? <Card.Img src={music.image} alt={`The cover for ${music.title}`} variant='top' /> : null}
                    <Card.Body>
                      <Card.Title>{music.title}</Card.Title>
                      <p className='small'>Artist: {music.artist}</p>

                      <ReactAudioPlayer
                        src={music.preview}
                        controls
                      />
                      <Button className='btn-block btn-danger' onClick={() => handleDeleteMusic(music._id)}>
                        Delete!
                  </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </> :
        <NotLoggedIn />}
    </>
  );
}

export default SavedMusic;
