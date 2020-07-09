import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { saveMovie, searchOMDB, searchEachMovie } from '../utils/API';

function SearchMovies() {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const userData = useContext(UserInfoContext);

  // create method to search for books and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    let movieDataArr = [];

    searchOMDB(searchInput)
      .then(({ data }) => {
        console.log(data);
        const movieID = data.Search.map(movie => (movie.imdbID));

        // console.log(movieData);
        movieID.forEach(id => {
          searchEachMovie(id)
            .then((res) => {
              console.log(res);
              movieDataArr.push(res);
              console.log(movieDataArr);

              // console.log(movieData);
              // return setSearchedMovies(movieData);
            })
            .then(() => {
              const movieData = movieDataArr.map(movie => ({
                movieId: movie.data.imdbID,
                actors: movie.data.Actors,
                director: movie.data.Director,
                genre: movie.data.Genre,
                plot: movie.data.Plot,
                rated: movie.data.Rated,
                released: movie.data.Released,
                runtime: movie.data.Runtime,
                title: movie.data.Title,
                image: movie.data.Poster || ''
              }));
              console.log(movieData);

              return setSearchedMovies(movieData);

            })
          // movieDataArr.push(searchEachMovie(id));
          // console.log(movieDataArr);
        });

        // const movieData = movieDataArr.map(movie => ({
        //   movieId: data.imdbID,
        //   title: data.Title,
        //   image: data.Poster || '',
        //   year: data.Year
        // }));
        // console.log(`movieDataArr: ${movieDataArr}`);

        // const movieData = movieDataArr[0]
        // console.log(moveiData);

        // return setSearchedMovies(movieData);
      })
      .then(() => setSearchInput(''))
      .catch((err) => console.log(err));
  };

  // create function to handle saving a book to our database
  const handleSaveMovie = (movieId) => {
    // find the book in `searchedBooks` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    console.log(movieToSave);
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    // send the books data to our api
    saveMovie(movieToSave, token)
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
        <h2>{searchedMovies.length ? `Viewing ${searchedMovies.length} results:` : 'Search for a movie to begin'}</h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Released: {movie.released}</p>
                  <p className='small'>Actors: {movie.actors}</p>
                  <p className='small'>Director: {movie.director}</p>
                  <p className='small'>Genre: {movie.genre}</p>
                  <p className='small'>Plot: {movie.plot}</p>
                  <p className='small'>Rated: {movie.rated}</p>
                  <p className='small'>Runtime: {movie.runtime}</p>
                  {userData.username && (
                    <Button
                      disabled={userData.savedMovies?.some((savedMovie) => savedMovie.movieId === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {userData.savedMovies?.some((savedMovie) => savedMovie.movieId === movie.movieId)
                        ? 'This movie has already been saved!'
                        : 'Save this Movie!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default SearchMovies;
