import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import { FaVideo } from 'react-icons/fa';
import RateReviewForSearched from '../RateReviewForSearched';
import './style.css';

function SearchCards(props) {

    function randomNum() {
        return Math.floor(Math.random() * 4) + 1;
    }

    if (props.cardType === 'searchedBooks') {
        return (
            <>
                {/* <h2>{props.resultArray.length
                    ? `Viewing ${props.resultArray.length} ${props.resultArray.length === 1 ? 'result' : 'results'}:`
                    : 'Search for a book to begin'}
                </h2> */}
                <CardColumns>
                    {props.resultArray.map((book) => {
                        return (

                            <Card className={`book-border${randomNum()}`} key={book.mediaId} border='dark'>
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
                                    <RateReviewForSearched
                                        username={props.username}
                                        savedArray={props.savedArray}
                                        mediatype={'book'}
                                        mediaType={'Books'}
                                        mediaTypeSg={'Book'}
                                        media={book}
                                        cb={props.cb}
                                        link={'/saved_books'}
                                    />
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </>
        )
    } else if (props.cardType === 'searchedMusic') {
        return (
            <>
                {/* <h2>
                    {props.resultArray.length
                        ? `Viewing ${props.resultArray.length} ${props.resultArray.length === 1 ? 'result' : 'results'}:`
                        : 'Search for music to begin'}
                </h2> */}
                <CardColumns>
                    {props.resultArray.map((music) => {
                        return (

                            <Card className={`music-border${randomNum()}`} key={music.mediaId} border='dark'>
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
                                    </div>
                                    <RateReviewForSearched
                                        username={props.username}
                                        savedArray={props.savedArray}
                                        mediatype={'music'}
                                        mediaType={'Music'}
                                        mediaTypeSg={'Music'}
                                        media={music}
                                        cb={props.cb}
                                        link={'/saved_music'}
                                    />
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </>
        );
    } else if (props.cardType === 'searchedMovies') {
        return (
            <>
                {/* <h2>{props.resultArray.length
                    ? `Viewing ${props.resultArray.length} ${props.resultArray.length === 1 ? 'result' : 'results'}:`
                    : 'Search for a movie to begin'}
                </h2> */}
                <CardColumns>
                    {props.resultArray.map((media) => {
                        return (

                            <Card className={`movie-border${randomNum()}`} key={media.mediaId} border='dark'>
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
                                    {media.plot === 'N/A' ? null : <div className='scroll-box'><Card.Text> {media.plot}</Card.Text></div>}
                                    {media.actors === 'N/A' ? null : <p className='small closer-p'><b>Starring:</b> {media.actors}</p>}
                                    {media.released === 'N/A' ? null : <p className='small closer-p'><b>Released:</b> {media.released}</p>}
                                    {media.genre === 'N/A' ? null : <p className='small closer-p'><b>Genre:</b> {media.genre}</p>}
                                    {media.rated === 'N/A' ? null : <p className='small closer-p'><b>Rated:</b> {media.rated}</p>}
                                    {media.runtime === 'N/A' ? null : <p className='small'><b>Runtime:</b> {media.runtime}</p>}
                                    <RateReviewForSearched
                                        username={props.username}
                                        savedArray={props.savedArray}
                                        mediatype={'movie'}
                                        mediaType={'Movies'}
                                        mediaTypeSg={'Movie'}
                                        media={media}
                                        cb={props.cb}
                                        link={'/saved_movies'}
                                    />
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </>
        )
    } else if (props.cardType === 'searchedGames') { 
        return (
            <>
                {/* <h2>{props.resultArray.length
                    ? `Viewing ${props.resultArray.length} results:`
                    : 'Search for a video game to begin'}
                </h2> */}
                <CardColumns>
                    {props.resultArray.map((game) => {
                        return (
                            <Card className={`game-border${randomNum()}`} key={game.mediaId} border='dark'>
                                <div className='center-wrap'>
                                    {game.image ? <Card.Img className='mediaImage' src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                                </div>
                                <Card.Body >
                                    <div className='center-wrap'>
                                        <Card.Title>
                                            <b>{game.title.toUpperCase()}</b>
                                            <p className='by'>Developer: {game.developer}</p>
                                        </Card.Title>
                                    </div>
                                    <div className='scroll-box'>
                                        <Card.Text>{game.description}</Card.Text>
                                    </div>
                                    <RateReviewForSearched
                                        username={props.username}
                                        savedArray={props.savedArray}
                                        mediatype={'game'}
                                        mediaType={'Games'}
                                        mediaTypeSg={'Game'}
                                        media={game}
                                        cb={props.cb}
                                        link={'/saved_games'}
                                    />
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </>
        );
    } else if (props.cardType === 'searchedUsers') {
        return (
            <>
                <CardColumns>

                    <Card key={props.searchedUser._id} border='dark'>
                        <div className='center-wrap'>
                            <Card.Img className='mediaImage' src={props.searchedUser.picture} alt={` ${props.searchedUser.username}`} variant='top' />
                            <Card.Body>
                                <Card.Title>
                                    <b>{props.searchedUser.username.toUpperCase()}</b>
                                    <p className='by'><b>email:</b> {props.searchedUser.email}</p>
                                </Card.Title>
                                {props.savedArray?.every((friend) => friend._id !== props.searchedUser._id)
                                    ? <Button
                                        className='btn-block btn-info save-friend'
                                        onClick={() => props.handleSaveFriend()}>
                                        Save Friend
                                </Button>
                                    : <Button
                                        className='btn-block btn-info save-friend'
                                        onClick={() => props.handleDeleteFriend(props.searchedUser._id)}>
                                        Remove Friend
                                </Button>}
                            </Card.Body>
                        </div>
                    </Card>

                </CardColumns>
            </>
        );
    }

}

export default SearchCards;