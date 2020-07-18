import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import NotLoggedIn from '../../components/NotLoggedIn';
import SavedCards from '../../components/SavedCards';

// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';

import * as API from '../../utils/API';
import AuthService from '../../utils/auth';

function SavedBooks() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  console.log("this is the userdata:", userData);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = (book_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteBook(book_id, token)
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
              <h1>Viewing saved books!</h1>
            </Container>
          </Jumbotron>
          <Container>
            <SavedCards
              cardType='savedBooks'
              savedArray={userData.savedBooks}
              handleDeleteBook={handleDeleteBook}
              comments={userData.savedBooks.comments}
            />
          </Container>
        </> :
        <NotLoggedIn />}
    </>
  );
}

export default SavedBooks;
