import React, { useState, useContext, useCallback } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import SearchCards from '../../components/SearchCards';
import SearchIconGroup from '../../components/SearchIconGroup';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { saveBook, searchGoogleBooks } from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faUserCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './style.css'

function SearchBooks() {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
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

    searchGoogleBooks(searchInput)
      .then(({ data }) => {
        console.log("BOOK DATA", data);
        if(data.totalItems === 0){
          return setValidSearch(false);
        }

        const bookData = data.items.map((book) => ({
          mediaId: book.id,
          timeStamp: Date.now(),
          createdAt: Date(),
          authors: book.volumeInfo.authors || ['No author to display'],
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail || ''
        }));
        console.log(bookData);

        setSearchedBooks(bookData);
        setValidSearch(true);
      })
      .then(() => setSearchInput(''))
      .catch((err) => console.log(err));
  };

  // create function to handle saving a book to our database
  const handleSaveMedia = useCallback((book, userRating, userReview) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = {
      mediaId: book.mediaId,
      timeStamp: Date.now(),
      createdAt: Date(),
      authors: book.authors || ['No author to display'],
      title: book.title,
      description: book.description,
      image: book.image,
      userRating: userRating,
      userReview: userReview
    }

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    // send the books data to our api
    saveBook(bookToSave, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  });

  return (
    <div id="container">
      <Row>
        <Container id='search-wrap'>
          <Row>
            <Col xs={0} s={0} md={1} lg={2}></Col>
            <Col xs={12} s={12} md={10} lg={8}>
              <h5 id="search-heading">SEARCH BOOKS</h5>
              <div id='form-hugger'>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Control
                    id="api-search-input"
                    name='searchInput'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type='text'
                    size='lg'
                    placeholder='Search for a book'
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
          cardType='searchedBooks'
          resultArray={searchedBooks}
          savedArray={userData.savedBooks}
          username={userData.username}
          cb={handleSaveMedia}
        />
        : <h2 className='muted-subtext3'>Sorry, we could not find any books that matched your search.</h2>}
      </Container>
    </div>
  );
}

export default SearchBooks;
