import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import { FaVideo } from 'react-icons/fa';
import RateReviewForSearched from '../RateReviewForSearched';

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

                            <Card key={book.bookId} border='dark'>
                                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
                                    {props.username && (
                                        <Button
                                            disabled={props.savedArray?.some((savedBook) => savedBook.bookId === book.bookId)}
                                            className='btn-block btn-info'
                                            onClick={() => props.handleBtnClick(book.bookId)}>
                                            {props.savedArray?.some((savedBook) => savedBook.bookId === book.bookId)
                                                ? 'This book has already been saved!'
                                                : 'Save this Book!'}
                                        </Button>
                                    )}
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

                            <Card key={music.musicId} border='dark'>
                                {music.image ? <Card.Img src={music.image} alt={`The cover for ${music.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{music.title}</Card.Title>
                                    <p className='small'>Artist: {music.artist}</p>
                                    {/* <Card.Text>Link: {music.link}</Card.Text> */}
                                    <ReactAudioPlayer
                                        src={music.preview}
                                        controls
                                    />
                                    {props.username && (
                                        <Button
                                            disabled={props.savedArray?.some((savedMusic) => savedMusic.musicId === music.musicId)}
                                            className='btn-block btn-info'
                                            onClick={() => {
                                                props.handleSaveMusic(music.musicId)
                                            }}>
                                            {props.savedArray?.some((savedMusic) => savedMusic.musicId === music.musicId)
                                                ? 'This has already been saved!'
                                                : 'Save!'}
                                        </Button>
                                    )}
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

                            <Card key={media.movieId} border='dark'>
                                {media.image === 'N/A' ? null : <Card.Img src={media.image} alt={`The cover for ${media.title}`} variant='top' />}
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
                                        media={media}
                                        setUserRating={props.setUserRating}
                                        userRating={props.userRating}
                                        setHover={props.setHover}
                                        hover={props.hover}
                                        setReviewInput={props.setReviewInput}
                                        handleSaveMedia={props.handleSaveMedia}
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

                            <Card key={game.gameId} border='dark'>
                                {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                                <Card.Body >
                                    <Card.Title>{game.title}</Card.Title>
                                    <p className='small'>Developer: {game.developer}</p>
                                    <Card.Text>{game.description}</Card.Text>
                                    {props.username && (
                                        <Button
                                            disabled={props.savedArray?.some((savedGame) => savedGame.gameId === game.gameId)}
                                            className='btn-block btn-info'
                                            onClick={() => props.handleSaveGame()}>
                                            {props.savedArray?.some((savedGame) => savedGame.gameId === game.gameId)
                                                ? 'This game has already been saved!'
                                                : 'Save this game!'}
                                        </Button>
                                    )}
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
                        <Card.Img src={props.searchedUser.picture} alt={` ${props.searchedUser.username}`} variant='top' />
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