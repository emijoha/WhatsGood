import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import { FaVideo } from 'react-icons/fa';
import RateReviewForSearched from '../RateReviewForSearched';
import './style.css';

function SearchCards(props) {

    if (props.cardType === 'searchedBooks') {
        return (
            <>
                <h2>{props.resultArray.length
                    ? `Viewing ${props.resultArray.length} ${props.resultArray.length === 1 ? 'result' : 'results'}:`
                    : 'Search for a book to begin'}
                </h2>
                <CardColumns>
                    {props.resultArray.map((book) => {
                        return (

                            <Card key={book.mediaId} border='dark'>
                                <div className='center-wrap'>
                                    {book.image ? <Card.Img className='mediaImage' src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                </div>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>

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
                <h2>{props.resultArray.length
                    ? `Viewing ${props.resultArray.length} ${props.resultArray.length === 1 ? 'result' : 'results'}:`
                    : 'Search for music to begin'}</h2>
                <CardColumns>
                    {props.resultArray.map((music) => {
                        return (

                            <Card key={music.mediaId} border='dark'>
                                <div className='center-wrap'>
                                    {music.image ? <Card.Img className='mediaImage' src={music.image} alt={`The cover for ${music.title}`} variant='top' /> : null}
                                </div>
                                <Card.Body>
                                    <Card.Title>{music.title}</Card.Title>
                                    <p className='small'>Artist: {music.artist}</p>
                                    {/* <Card.Text>Link: {music.link}</Card.Text> */}
                                    <ReactAudioPlayer
                                        src={music.preview}
                                        controls
                                    />

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
                <h2>{props.resultArray.length
                    ? `Viewing ${props.resultArray.length} ${props.resultArray.length === 1 ? 'result' : 'results'}:`
                    : 'Search for a movie to begin'}
                </h2>
                <CardColumns>
                    {props.resultArray.map((media) => {
                        return (

                            <Card key={media.mediaId} border='dark'>
                                <div className='center-wrap'>
                                    {media.image === 'N/A' ? null : <Card.Img className='mediaImage' src={media.image} alt={`The cover for ${media.title}`} variant='top' />}
                                </div>
                                <Card.Body>
                                    <Card.Title>{media.title}</Card.Title>
                                    {media.released === 'N/A' ? null : <p className='small'>Released: {media.released}</p>}
                                    {media.actors === 'N/A' ? null : <p className='small'>Actors: {media.actors}</p>}
                                    {media.director === 'N/A' ? null : <p className='small'>Director: {media.director}</p>}
                                    {media.genre === 'N/A' ? null : <p className='small'>Genre: {media.genre}</p>}
                                    {media.plot === 'N/A' ? null : <p className='small'>Plot: {media.plot}</p>}
                                    {media.rated === 'N/A' ? null : <p className='small'>Rated: {media.rated}</p>}
                                    {media.runtime === 'N/A' ? null : <p className='small'>Runtime: {media.runtime}</p>}

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
                <h2>{props.resultArray.length
                    ? `Viewing ${props.resultArray.length} results:`
                    : 'Search for a video game to begin'}</h2>
                <CardColumns>
                    {props.resultArray.map((game) => {
                        return (

                            <Card key={game.mediaId} border='dark'>
                                <div className='center-wrap'>
                                    {game.image ? <Card.Img className='mediaImage' src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                                </div>
                                <Card.Body >
                                    <Card.Title>{game.title}</Card.Title>
                                    <p className='small'>Developer: {game.developer}</p>
                                    <Card.Text>{game.description}</Card.Text>

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
                        </div>
                        <Card.Body>
                            <Card.Title>{props.searchedUser.username}</Card.Title>
                            <p className='small'>Username: {props.searchedUser.username}</p>
                            <Card.Text>{props.searchedUser.username}</Card.Text>
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
                    </Card>

                </CardColumns>
            </>
        );
    }

}

export default SearchCards;