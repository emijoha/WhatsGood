import React from 'react';
import { CardColumns, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons'; import ReactAudioPlayer from 'react-audio-player';
import RateSaved from '../RateSaved';
import ReviewSaved from '../ReviewSaved';
import './style.css';

function SavedCards(props) {

    if (props.cardType === 'savedBooks') {
        return (
            <>
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'book' : 'books'}:`
                        : 'You have no saved books!'}
                </h2>
                <CardColumns>
                    {props.savedArray.map((book) => {
                        return (

                            <Card key={book._id} border='dark'>
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
                                    <Card.Text>{book.description}</Card.Text>
                                    <div className='center-wrap'>
                                        <p className='ratingReviewHeading'>Your Rating</p>
                                        <p class='rating'>
                                            {[...Array(book.userRating)].map((star, i) => {
                                                return (
                                                    <label key={i}>
                                                        <FontAwesomeIcon className='read-only-star' icon={faBookOpen} color='black' size={'lg'} />
                                                    </label>
                                                )
                                            })}
                                        </p>
                                        <p className='ratingReviewHeading'>Your Review</p>
                                    </div>
                                    <p>{book.userReview}</p>
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
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteBook(book._id)}>
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

                            <Card key={music._id} border='dark'>
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
                                        <p className='ratingReviewHeading'>Your Rating</p>
                                        <p class='rating'>{[...Array(music.userRating)].map((star, i) => {
                                            return (
                                                <label key={i}>
                                                    <FontAwesomeIcon className='read-only-star' icon={faMusic} color='black' size={'lg'} />
                                                </label>
                                            )
                                        })}
                                        </p>
                                        <p className='ratingReviewHeading'>Your Review</p>
                                    </div>
                                    <p>{music.userReview}</p>
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
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMusic(music._id)}>
                                        Delete!
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </>
        );
        // simple move card, couldn't figure out movie review. 
        // savedMovies page does not currently use this component, left it as is for now
        // ratings/review form shoudl be seperate component with its own state, with just bare necessities of props needed from savedMovies state/functionality
    } else if (props.cardType === 'savedMovies') {
        return (
            <>
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'movie' : 'movies'}:`
                        : 'You have no saved movies!'}
                </h2>
                <CardColumns>
                    {props.savedArray.map((media) => {
                        return (
                            <Card key={media.mediaId} border='dark'>
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
                                    {media.plot === 'N/A' ? null : <Card.Text> {media.plot}</Card.Text>}

                                    {media.actors === 'N/A' ? null : <p className='small closer-p'><b>Starring:</b> {media.actors}</p>}
                                    {media.released === 'N/A' ? null : <p className='small closer-p'><b>Released:</b> {media.released}</p>}
                                    {media.genre === 'N/A' ? null : <p className='small closer-p'><b>Genre:</b> {media.genre}</p>}
                                    {media.rated === 'N/A' ? null : <p className='small closer-p'><b>Rated:</b> {media.rated}</p>}
                                    {media.runtime === 'N/A' ? null : <p className='small'><b>Runtime:</b> {media.runtime}</p>}

                                    <div className='center-wrap'>
                                        <p className='ratingReviewHeading'>Your Rating</p>
                                        <p class='rating'>{[...Array(media.userRating)].map((star, i) => {
                                            return (
                                                <label key={i}>
                                                    <FontAwesomeIcon className='read-only-star' icon={faVideo} color='black' size={'lg'} />
                                                </label>
                                            )
                                        })}
                                        </p>
                                        <p className='ratingReviewHeading'>Your Review</p>
                                    </div>
                                    <p>{media.userReview}</p>
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
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMovie(media._id)}>
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
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'video game' : 'video games'}:`
                        : 'You have no saved video games!'}
                </h2>
                <CardColumns>
                    {props.savedArray.map((game) => {
                        return (

                            <Card key={game._id} border='dark'>
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
                                    <Card.Text>{game.description}</Card.Text>
                                    <div className='center-wrap'>
                                        <p className='ratingReviewHeading'>Your Rating</p>
                                        <p class='rating'>
                                            {[...Array(game.userRating)].map((star, i) => {
                                                return (
                                                    <label key={i}>
                                                        <FontAwesomeIcon className='read-only-star' icon={faGamepad} color='black' size={'lg'} />
                                                    </label>
                                                )
                                            })}
                                        </p>
                                        <p className='ratingReviewHeading'>Your Review</p>
                                    </div>
                                    <p>{game.userReview}</p>
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
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteGame(game._id)}>
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
        return (
            <>
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'friend' : 'friends'}:`
                        : 'You have no friends!'}
                    {console.log("hey there im in the header", props.savedArray)}
                </h2>
                <CardColumns>
                    {props.savedArray.map(friend => {
                        console.log("this is my friend, ", friend)
                        return (

                            <Card key={friend._id} border='dark'>
                                <div className='center-wrap'>
                                    {friend.picture ? <Card.Img className='mediaImage' src={friend.picture} alt={friend.username} variant='top' /> : null}
                                </div>
                                <Card.Body>
                                    <Card.Title>{friend.username}</Card.Title>
                                    <p className='small'>Email: {friend.email}</p>
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteFriend(friend._id)}>
                                        Remove Friend
                                    </Button>
                                </Card.Body>
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