import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Col, Form, Button } from 'react-bootstrap';

import * as API from '../../utils/API';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
// import { saveMovie, searchOMDB, searchEachMovie, } from '../utils/API';
// import { saveUserRating, saveMovieReview } as API from '../utils/API';
import SearchCards from '../../components/SearchCards';

function SearchMovies() {
  // create state for holding returned omdb api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // const [movieToReview, setMovieToReview] = useState('');
  // const [movieToRate, setMovieToRate] = useState('');

  // const [selectedMovieRating, setSelectedMovieRating] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewInput, setReviewInput] = useState('');


  const userData = useContext(UserInfoContext);

  console.log('reviewInput: ', reviewInput, 'userRating: ', userRating);

  // create method to search for movies and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    let movieDataArr = [];

    API.searchOMDB(searchInput)
      .then(({ data }) => {
        const movieID = data.Search.map(movie => (movie.imdbID));

        movieID.forEach(id => {
          API.searchEachMovie(id)
            .then((res) => {
              movieDataArr.push(res);
            })
            .then(() => {
              const movieData = movieDataArr.map(movie => ({
                movieId: movie.data.imdbID,
                timeStamp: Date.now(),
                createdAt: Date(),
                actors: movie.data.Actors,
                director: movie.data.Director,
                genre: movie.data.Genre,
                plot: movie.data.Plot,
                rated: movie.data.Rated,
                released: movie.data.Released,
                runtime: movie.data.Runtime,
                title: movie.data.Title,
                image: movie.data.Poster || '',
              }));

              return setSearchedMovies(movieData);
            })
        });
      })
      .then(() => setSearchInput(''))
      .catch((err) => console.log(err));
  };

  // create function to handle saving a movie to the database
  const handleSaveMedia = (movie) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = {
      movieId: movie.movieId,
      timeStamp: Date.now(),
      createdAt: Date(),
      actors: movie.actors,
      director: movie.director,
      genre: movie.genre,
      plot: movie.plot,
      rated: movie.rated,
      released: movie.released,
      runtime: movie.runtime,
      title: movie.title,
      image: movie.image || '',
      userRating: userRating,
      movieReview: reviewInput
    }

    console.log('movieToSave: ', movieToSave);
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    // send the movie data to the api
    API.saveMovie(movieToSave, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
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
        cardType='searchedMovies'
        resultArray={searchedMovies}
        savedArray={userData.savedMovies}
        username={userData.username}
        setUserRating={setUserRating}
        userRating={userRating}
        setHover={setHover}
        hover={hover}
        setReviewInput={setReviewInput}
        handleSaveMedia={handleSaveMedia}
        />
      </Container>
    </>
  );
}

export default SearchMovies;
