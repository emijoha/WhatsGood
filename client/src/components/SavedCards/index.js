import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Form, Col } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import ReactAudioPlayer from 'react-audio-player';
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
                                {book.image ? <Card.Img className='mediaImage' src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
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
                                {music.image ? <Card.Img className='mediaImage' src={music.image} alt={`The cover for ${music.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{music.title}</Card.Title>
                                    <p className='small'>Artist: {music.artist}</p>
                                    <ReactAudioPlayer
                                        src={music.preview}
                                        controls
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
                    {props.savedArray.map((movie) => {
                        return (

                            <Card key={movie._id} border='dark'>
                                {movie.image ? <Card.Img className='mediaImage' src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <p className='small'>Released: {movie.released}</p>
                                    <p className='small'>Actors: {movie.actors}</p>
                                    <p className='small'>Director: {movie.director}</p>
                                    <p className='small'>Genre: {movie.genre}</p>
                                    <p className='small'>Plot: {movie.plot}</p>
                                    <p className='small'>Rated: {movie.rated}</p>
                                    <p className='small'>Runtime: {movie.runtime}</p>
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMovie(movie._id)}>
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
                                {game.image ? <Card.Img className='mediaImage' src={game.image} alt={`The image for ${game.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{game.title}</Card.Title>
                                    <p className='small'>Developer: {game.developer}</p>
                                    <Card.Text>{game.description}</Card.Text>
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
                                {friend.picture ? <Card.Img className='mediaImage' src={friend.picture} alt={friend.username} variant='top' /> : null}
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