import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function BookCards(props) {

    if (props.cardType === 'savedBooks') {
        return (
            <Container>
                <h2>
                    {props.bookArray.length
                        ? `Viewing ${props.bookArray.length} saved ${props.bookArray.length === 1 ? 'book' : 'books'}:`
                        : 'You have no saved books!'}
                </h2>
                <CardColumns>
                    {props.bookArray.map((book) => {
                        return (
                            <Card key={book._id} border='dark'>
                                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => props.onClick(book._id)}>
                                        Delete this Book!
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        );
    } else if (props.cardType === 'searchedBooks') {
        return (
            <Container>
                <h2>
                    {props.bookArray.length
                        ? `Viewing ${props.bookArray.length} ${props.bookArray.length === 1 ? 'result' : 'results'}:`
                        : 'Search for a book to begin!'}
                </h2>
                <CardColumns>
                    {props.bookArray.map((book) => {
                        return (
                            <Card key={book.bookId} border='dark'>
                                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
                                    {userData.username && (
                                        <Button
                                            disabled={props.bookArray?.some((savedBook) => savedBook.bookId === book.bookId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveBook(book.bookId)}>
                                            {userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)
                                                ? 'This book has already been saved!'
                                                : 'Save this Book!'}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        );
    }


}

export default BookCards;