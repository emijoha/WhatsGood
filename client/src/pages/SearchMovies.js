import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';

import * as API from '../utils/API';
import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
// import { saveMovie, searchOMDB, searchEachMovie, } from '../utils/API';
// import { saveUserRating, saveMovieReview } as API from '../utils/API';

function SearchMovies() {
  // create state for holding returned omdb api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const [selectedMovieRating, setSelectedMovieRating] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(null);

  const userData = useContext(UserInfoContext);

  const startRating = ({ movie }) => {
    console.log('movie: ', movie);

    setSelectedMovieRating(movie);
  }

  const handleRatingFormSubmit = (event) => {
    event.preventDefault();

    console.log('hey asshole');

    saveUserRating();
  }

  const saveUserRating = () => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let updateCriteria = {
      id: selectedMovieRating._id,
      userRating: userRating
    }
    console.log(updateCriteria);

    API.saveUserRating(updateCriteria, token)
      .then(() => setUserRating(null))
      .then(() => setSelectedMovieRating(''))
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  }

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
                image: movie.data.Poster || ''
              }));

              return setSearchedMovies(movieData);
            })
        });
      })
      .then(() => setSearchInput(''))
      .catch((err) => console.log(err));
  };

  // create function to handle saving a movie to the database
  const handleSaveMovie = (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    console.log(movieToSave);
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
        <h2>{searchedMovies.length ? `Viewing ${searchedMovies.length} results:` : 'Search for a movie to begin'}</h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image === 'N/A' ? null : <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' />}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  {movie.release === 'N/A' ? null : <p className='small'>Released: {movie.released}</p>}
                  {movie.actors === 'N/A' ? null : <p className='small'>Actors: {movie.actors}</p>}
                  {movie.director === 'N/A' ? null : <p className='small'>Director: {movie.director}</p>}
                  {movie.genre === 'N/A' ? null : <p className='small'>Genre: {movie.genre}</p>}
                  {movie.plot === 'N/A' ? null : <p className='small'>Plot: {movie.plot}</p>}
                  {movie.rated === 'N/A' ? null : <p className='small'>Rated: {movie.rated}</p>}
                  {movie.runtime === 'N/A' ? null : <p className='small'>Runtime: {movie.runtime}</p>}
                  
                  {userData.username && (
                    <>
                      {userData.savedMovies?.some((savedMovie) => savedMovie.movieId === movie.movieId)
                        ?
                        <>
                          <h6>You have saved this movie to your movies! Would you like to add a rating?</h6>
                          <Button className='btn-block btn-success' onClick={() => startRating({ movie })}  >
                            Rate this Movie
                          </Button>
                        </>
                        :
                        <Button
                          className='btn-block btn-info'
                          onClick={() => handleSaveMovie(movie.movieId)}>
                          Save this Movie
                        </Button>
                      }
                    </>
                  )}

                  {selectedMovieRating._id && (
                    <>
                      {userData.savedMovies?.some((savedMovie) => savedMovie._id === selectedMovieRating._id)
                        ?
                        <Form onSubmit={handleRatingFormSubmit}>
                          {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                              <label>
                                <input type='radio' name='rating'
                                  value={i} onClick={() => setUserRating(ratingValue)} />
                                <FaVideo key={ratingValue} className='star' onMouseEnter={() => setHover(ratingValue)}
                                  onMouseLeave={() => setHover(null)} color={ratingValue <= (hover || userRating) ? 'black' : '#e4e5e9'} size={30} />
                              </label>
                            )
                          })}

                          <Col>
                            <Button type='submit' variant='success' size='md'>
                              Submit Rating
                            </Button>
                          </Col>
                        </Form>
                        : null
                      }
                    </>

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
