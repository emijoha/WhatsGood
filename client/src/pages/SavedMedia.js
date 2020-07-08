import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedMedia() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = (bookId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteBook(bookId, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteMusic = (musicId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteMusic(musicId, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing All Saved Media!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        <h2>
          {userData.savedMusic.length
            ? `Viewing ${userData.savedMusic.length} saved ${userData.savedMusic.length === 1 ? 'music' : 'music'}:`
            : 'You have no saved music!'}
        </h2>
        <CardColumns>
          {userData.savedMusic.map((music) => {
            return (
              <Card key={music.musicId} border='dark'>
                {music.image ? <Card.Img src={music.image} alt={`The cover for ${music.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{music.title}</Card.Title>
                  <p className='small'>Artist: {music.artist}</p>
                 
                  <ReactAudioPlayer
                    src={music.preview}
                      controls
                        />
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMusic(music.musicId)}>
                    Delete!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default SavedMedia;
