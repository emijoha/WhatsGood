import React from 'react';
import { CardColumns, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import SavedIconLinks from '../../components/SavedIconLinks';
import ReactAudioPlayer from 'react-audio-player';
import RateSaved from '../RateSaved';
import ReviewSaved from '../ReviewSaved';
import MakeFavorite from '../MakeFavorite';
import './style.css';
import FriendProfile from '../../pages/FriendProfile';

function SavedCards(props) {

  function randomNum() {
    return Math.floor(Math.random() * 4) + 1;
  }

  if (props.cardType === 'savedBooks') {
    return (
      <>
        {
          props.savedArray.map((book) => {
            return (
              <Card className='book-border' key={book._id} border='dark'>
                <MakeFavorite
                  username={props.username}
                  media={book}
                  makeFavorite={props.makeFavorite}
                />
                <div className='center-wrap'>
                  {book.image ? <Card.Img className='mediaImage' src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                </div>
                <Card.Body>
                  <div className='center-wrap'>
                    <Card.Title>
                      <b>{book.title.toUpperCase()}</b>
                      <p className='by'>{book.authors.length > 1 ? 'Authors' : 'Author'}: {book.authors}</p>
                    </Card.Title>
                  </div>
                  <div className='scroll-box mb-3'>
                    <Card.Text>{book.description}</Card.Text>
                  </div>
                  <div className='center-wrap'>
                    <p className='ratingReviewHeading book-border'>Your Rating</p>
                    <p className='rating'>
                      {
                        (book.userRating === 0)
                          ? <p>No rating yet.</p>
                          : null
                      }
                      {[...Array(book.userRating)].map((star, i) => {
                        return (
                          <label key={i}>
                            <FontAwesomeIcon className='read-only-star' icon={faBookOpen} color='black' size={'lg'} />
                          </label>
                        )
                      })}
                    </p>
                    <p className='ratingReviewHeading book-border'>Your Review</p>
                  </div>
                  <div className='scroll-box'>
                    {book.userReview.length ? book.userReview : "What's good... and what's not? No idea, there's no review yet!"}
                  </div>
                  <RateSaved
                    username={props.username}
                    mediaType={'Book'}
                    media={book}
                    startRating={props.startRating}
                    selectedMediaRating={props.selectedMediaRating}
                    handleRatingFormSubmit={props.handleRatingFormSubmit}
                    setUserRating={props.setUserRating}
                    userRating={props.userRating}
                    setHover={props.setHover}
                    hover={props.hover}
                  />
                  <ReviewSaved
                    username={props.username}
                    mediaType={'Book'}
                    media={book}
                    startReview={props.startReview}
                    selectedMediaReview={props.selectedMediaReview}
                    handleReviewFormSubmit={props.handleReviewFormSubmit}
                    setReviewInput={props.setReviewInput}
                  />
                  <Button
                    className='btn-block delete-btn book-color book-border book-hover-fill'
                    onClick={() => props.handleDeleteBook(book._id)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        }</>);

  } else if (props.cardType === 'savedMusic') {
    return (
      <>
        {
          props.savedArray.map((music) => {
            return (

              <Card className='music-border' key={music._id} border='dark'>
                <MakeFavorite
                  username={props.username}
                  media={music}
                  makeFavorite={props.makeFavorite}
                />
                <div className='center-wrap'>
                  {music.image ? <Card.Img className='mediaImage' src={music.image} alt={`The cover for ${music.title}`} variant='top' /> : null}
                </div>
                <Card.Body>
                  <div className='center-wrap'>
                    <Card.Title>
                      <b>{music.title.toUpperCase()}</b>
                      <p className='by'>Artist: {music.artist}</p>
                    </Card.Title>
                    <ReactAudioPlayer
                      className='audio-player'
                      src={music.preview}
                      controls
                    />
                    <p className='ratingReviewHeading music-border'>Your Rating</p>
                    <p className='rating'>
                      {
                        (music.userRating === 0)
                          ? <p>No rating yet.</p>
                          : null
                      }
                      {[...Array(music.userRating)].map((star, i) => {
                        return (
                          <label key={i}>
                            <FontAwesomeIcon className='read-only-star' icon={faMusic} color='black' size={'lg'} />
                          </label>
                        )
                      })}
                    </p>
                    <p className='ratingReviewHeading music-border'>Your Review</p>
                  </div>
                  <div className='scroll-box'>
                    {music.userReview.length ? music.userReview : "What's good... and what's not? No idea, there's no review yet!"}
                  </div>
                  <RateSaved
                    username={props.username}
                    mediaType={'Music'}
                    media={music}
                    startRating={props.startRating}
                    selectedMediaRating={props.selectedMediaRating}
                    handleRatingFormSubmit={props.handleRatingFormSubmit}
                    setUserRating={props.setUserRating}
                    userRating={props.userRating}
                    setHover={props.setHover}
                    hover={props.hover}
                  />
                  <ReviewSaved
                    username={props.username}
                    mediaType={'Music'}
                    media={music}
                    startReview={props.startReview}
                    selectedMediaReview={props.selectedMediaReview}
                    handleReviewFormSubmit={props.handleReviewFormSubmit}
                    setReviewInput={props.setReviewInput}
                  />
                  <Button className='btn-block delete-btn music-color music-border music-hover-fill' onClick={() => props.handleDeleteMusic(music._id)}>
                    Delete this Music!
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        }</>);
  } else if (props.cardType === 'savedMovies') {
    return (
      <>
        {
          props.savedArray.map((media) => {
            return (
              <Card className='movie-border' key={media.mediaId} border='dark'>
                <MakeFavorite
                  username={props.username}
                  media={media}
                  makeFavorite={props.makeFavorite}
                />
                <div className='center-wrap'>
                  {media.image === 'N/A' ? null : <Card.Img className='mediaImage' src={media.image} alt={`The cover for ${media.title}`} variant='top' />}
                </div>
                <Card.Body>
                  <div className='center-wrap'>
                    <Card.Title>
                      <b>{media.title.toUpperCase()}</b>
                      {media.director === 'N/A' ? null : <p className='by'>Director: {media.director}</p>}
                    </Card.Title>
                  </div>
                  <div className='scroll-box mb-3'>
                    {media.plot === 'N/A' ? null : <Card.Text> {media.plot}</Card.Text>}
                  </div>
                  {media.actors === 'N/A' ? null : <p className='small closer-p'><b className='detail-title'>Starring:</b> {media.actors}</p>}
                  {media.released === 'N/A' ? null : <p className='small closer-p'><b className='detail-title'>Released:</b> {media.released}</p>}
                  {media.genre === 'N/A' ? null : <p className='small closer-p'><b className='detail-title'>Genre:</b> {media.genre}</p>}
                  {media.rated === 'N/A' ? null : <p className='small closer-p'><b className='detail-title'>Rated:</b> {media.rated}</p>}
                  {media.runtime === 'N/A' ? null : <p className='small'><b className='detail-title'>Runtime:</b> {media.runtime}</p>}
                  <div className='center-wrap mt-2'>
                    <p className='ratingReviewHeading movie-border'>Your Rating</p>
                    <p className='rating'>
                      {
                        (media.userRating === 0)
                          ? <p>No rating yet.</p>
                          : null
                      }
                      {[...Array(media.userRating)].map((star, i) => {
                        return (
                          <label key={i}>
                            <FontAwesomeIcon className='read-only-star' icon={faVideo} color='black' size={'lg'} />
                          </label>
                        )
                      })}
                    </p>
                    <p className='ratingReviewHeading movie-border'>Your Review</p>
                  </div>
                  <div className='scroll-box'>
                    {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
                  </div>
                  <RateSaved
                    username={props.username}
                    mediaType={'Movie'}
                    media={media}
                    startRating={props.startRating}
                    selectedMediaRating={props.selectedMediaRating}
                    handleRatingFormSubmit={props.handleRatingFormSubmit}
                    setUserRating={props.setUserRating}
                    userRating={props.userRating}
                    setHover={props.setHover}
                    hover={props.hover}
                  />
                  <ReviewSaved
                    username={props.username}
                    mediaType={'Movie'}
                    media={media}
                    startReview={props.startReview}
                    selectedMediaReview={props.selectedMediaReview}
                    handleReviewFormSubmit={props.handleReviewFormSubmit}
                    setReviewInput={props.setReviewInput}
                  />
                  <Button
                    className='btn-block delete-btn movie-color movie-border movie-hover-fill'
                    onClick={() => props.handleDeleteMovie(media._id)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        }</>);
  } else if (props.cardType === 'savedGames') {
    return (
      <>
        {
          props.savedArray.map((game) => {
            return (
              <Card className='game-border' key={game._id} border='dark'>
                <MakeFavorite
                  username={props.username}
                  media={game}
                  makeFavorite={props.makeFavorite}
                />
                <div className='center-wrap'>
                  {game.image ? <Card.Img className='mediaImage' src={game.image} alt={`The image for ${game.title}`} variant='top' /> : null}
                </div>
                <Card.Body>
                  <div className='center-wrap'>
                    <Card.Title>
                      <b>{game.title.toUpperCase()}</b>
                      <p className='by'>Developer: {game.developer}</p>
                    </Card.Title>
                  </div>
                  <div className='scroll-box'>
                    <Card.Text>{game.description}</Card.Text>
                  </div>
                  <div className='center-wrap'>
                    <p className='ratingReviewHeading game-border'>Your Rating</p>
                    <p className='rating'>
                      {
                        (game.userRating === 0)
                          ? <p>No rating yet.</p>
                          : null
                      }
                      {[...Array(game.userRating)].map((star, i) => {
                        return (
                          <label key={i}>
                            <FontAwesomeIcon className='read-only-star' icon={faGamepad} color='black' size={'lg'} />
                          </label>
                        )
                      })}
                    </p>
                    <p className='ratingReviewHeading game-border'>Your Review</p>
                  </div>
                  <div className='scroll-box'>
                    {game.userReview.length ? game.userReview : "What's good... and what's not? No idea, there's no review yet!"}
                  </div>
                  <RateSaved
                    username={props.username}
                    mediaType={'Game'}
                    media={game}
                    startRating={props.startRating}
                    selectedMediaRating={props.selectedMediaRating}
                    handleRatingFormSubmit={props.handleRatingFormSubmit}
                    setUserRating={props.setUserRating}
                    userRating={props.userRating}
                    setHover={props.setHover}
                    hover={props.hover}
                  />
                  <ReviewSaved
                    username={props.username}
                    mediaType={'Game'}
                    media={game}
                    startReview={props.startReview}
                    selectedMediaReview={props.selectedMediaReview}
                    handleReviewFormSubmit={props.handleReviewFormSubmit}
                    setReviewInput={props.setReviewInput}
                  />
                  <Button
                    className='btn-block delete-btn game-color game-border game-hover-fill'
                    onClick={() => props.handleDeleteGame(game._id)}>
                    Delete this Game!
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        }</>);

  } else if (props.cardType === 'savedFriends') {
    return (
      <>
        {
          props.savedArray.map(friend => {
            let number = randomNum();
            let media = ['book', 'music', 'movie', 'game'];
            return (
              <Card className={`friend-border${number}`} key={friend._id} border='dark'>
                <div className='center-wrap'>
                  <Link to={`/friend_profile?username=${friend.username}`}>
                    <Card.Img className='friendImage' src={friend.picture} alt={friend.username} variant='top' />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      <Link id='neon-hover' to={`/friend_profile?username=${friend.username}`}>
                        <div className='friend-name-title'>{friend.username.toUpperCase()}</div>
                        <div className='center-wrap mt-1' style={{ fontStyle: 'italic' }}>
                        <p id='full-user-name'>{friend.firstName} {friend.lastName}</p>
                      </div>
                      </Link>
                      <SavedIconLinks 
                        type='friend'
                        music={friend.savedMusic.length}
                        movies={friend.savedMovies.length}
                        games={friend.savedGames.length}
                        books={friend.savedBooks.length}
                      ></SavedIconLinks>
                    </Card.Title>
                    <Button
                      className={`btn-block delete-btn ${media[number - 1]}-color ${media[number - 1]}-border ${media[number - 1]}-hover-fill`}
                      href='/messages'
                      id='first-btn'>
                      Send a Message
                    </Button>
                    <Button className={`btn-block delete-btn ${media[number - 1]}-color ${media[number - 1]}-border ${media[number - 1]}-hover-fill`}
                      onClick={() => props.handleDeleteFriend(friend._id)}>
                      Remove Friend
                    </Button>
                  </Card.Body>
                </div>
              </Card>
            );
          })
        }</>);
  } else {
    return null;
  }

}

export default SavedCards;