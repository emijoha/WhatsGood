import React from 'react';
import { CardColumns, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons'; import ReactAudioPlayer from 'react-audio-player';
import RateSaved from '../RateSaved';
import ReviewSaved from '../ReviewSaved';
import MakeFavorite from '../MakeFavorite';
import './style.css';

function SavedCards(props) {

  function randomNum() {
    return Math.floor(Math.random() * 4) + 1;
  }

  if (props.cardType === 'savedBooks') {
    return (
      <>
        {/* <h2>
          {props.savedArray.length
            ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2> */}
        <CardColumns>
          {props.savedArray.map((book) => {
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
                  <div className='scroll-box'>
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
                  <Button className='btn-block book-back' onClick={() => props.handleDeleteBook(book._id)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </>
    );
  } else if (props.cardType === 'savedMusic') {
    return (
      <>
        <h2>
          {props.savedArray.length
            ? `Viewing ${props.savedArray.length} saved in music:`
            : 'You have no saved music!'}
        </h2>
        <CardColumns>
          {props.savedArray.map((music) => {
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
                  <Button className='btn-block music-back' onClick={() => props.handleDeleteMusic(music._id)}>
                    Delete!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </>
    );
  } else if (props.cardType === 'savedMovies') {
    return (
      <>
        {/* <h2>
          {props.savedArray.length
            ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2> */}
        <CardColumns>
          {props.savedArray.map((media) => {
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
                  <div className='scroll-box'>
                    {media.plot === 'N/A' ? null : <Card.Text> {media.plot}</Card.Text>}
                  </div>
                  {media.actors === 'N/A' ? null : <p className='small closer-p'><b>Starring:</b> {media.actors}</p>}
                  {media.released === 'N/A' ? null : <p className='small closer-p'><b>Released:</b> {media.released}</p>}
                  {media.genre === 'N/A' ? null : <p className='small closer-p'><b>Genre:</b> {media.genre}</p>}
                  {media.rated === 'N/A' ? null : <p className='small closer-p'><b>Rated:</b> {media.rated}</p>}
                  {media.runtime === 'N/A' ? null : <p className='small'><b>Runtime:</b> {media.runtime}</p>}
                  <div className='center-wrap'>
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
                  <Button className='btn-block movie-back' onClick={() => props.handleDeleteMovie(media._id)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </>
    );
  } else if (props.cardType === 'savedGames') {
    return (
      <>
        {/* <h2>
          {props.savedArray.length
            ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'video game' : 'video games'}:`
            : 'You have no saved video games!'}
        </h2> */}
        <CardColumns>
          {props.savedArray.map((game) => {
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
                  <Button className='btn-block game-back' onClick={() => props.handleDeleteGame(game._id)}>
                    Delete this Game!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </>
    );
  } else if (props.cardType === 'savedFriends') {
      let number = randomNum();
      let background = ['book-back', 'music-back', 'movie-back', 'game-back'];
    return (
      <>
        <CardColumns>
          {props.savedArray.map(friend => {
            console.log("this is my friend, ", friend)
            return (

              <Card className={`friend-border${number}`} key={friend._id} border='dark'>
                <div className='center-wrap'>
                  <Card.Img className='mediaImage' src={friend.picture} alt={friend.username} variant='top' />
                  <Card.Body>
                    <Card.Title>
                      <b>{friend.username.toUpperCase()}</b>
                      <p className='by'><b>email:</b> {friend.email}</p>
                    </Card.Title>
                    <Button className={`btn-block ${background[number - 1]}`} onClick={() => props.handleDeleteFriend(friend._id)}>
                      Remove Friend
                    </Button>
                  </Card.Body>
                </div>
              </Card>

            );
          })
          }
        </CardColumns>
      </>
    );
  }

}

export default SavedCards;