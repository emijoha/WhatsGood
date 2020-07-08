import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { saveFriend, getUser } from '../utils/API';

function SearchUser() {
    // create state for holding returned google api data
    const [searchedUser, setSearchedUser] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    const userData = useContext(UserInfoContext);

    // create method to search for users and set state on form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("clicked", searchInput)

        if (!searchInput) {
            return false;
        }

        getUser(searchInput)
            .then(user => setSearchedUser({
                username: user.data.username,
                _id: user.data._id
            }))
            .then(console.log("searchedUser", searchedUser))
    }

    // function to handle saving a friend to database
    const handleSaveFriend = () => {
        // find the friend in `searchedUser` state by the matching id
        // const userToSave = searchedUser.find((user) => user._id === userId);

        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;
        if (!token) {
            return false;
        }

        // send the friend data to our api
        saveFriend(searchedUser, token)
            .then(() => {
                console.log("saved user", searchedUser);
                userData.getUserData();
            })
            .catch((err) => console.log(err));
    };

    //   {userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)
    //     ? 'This book has already been saved!'
    //     : 'Save this Book!'}

    // disabled={userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)}
    // {searchedUser.map((user) => {}
    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Search for a Friend!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a friend by user name'
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
                <h2></h2>
                <CardColumns>
                    <Card key={searchedUser._id} border='dark'>
                        {searchedUser.image ? <Card.Img src={searchedUser.image} alt={` ${searchedUser.username}`} variant='top' /> : null}
                        <Card.Body>
                            <Card.Title>{searchedUser.username}</Card.Title>
                            <p className='small'>Username: {searchedUser.username}</p>
                            <Card.Text>{searchedUser.username}</Card.Text>
                            {searchedUser.username && (
                                <Button
                                    className='btn-block btn-info save-friend'
                                    onClick={() => handleSaveFriend()}>
                                    Save Friend
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </CardColumns>
            </Container>
        </>
    );
}

export default SearchUser;