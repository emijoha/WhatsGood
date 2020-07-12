import React, { useContext, useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';

function SavedFriends() {

    const [friendsArray, setFriendsArray] = useState([]);

    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);

    useEffect(() => {
        console.log("user data Id", userData)
        
        if (userData._id !== '') {
            API.getUser(userData._id)
                .then(result => {
                    setFriendsArray(friendsArray => [...friendsArray, result.data])
                });
        }
    }, [userData])
    // OLD WAY TO GET FRIENDS
    // useEffect(() => {

    //    console.log("mounted")
    //    console.log("USER DATA INSIDE USE EFFECT", userData.friends)
    //     userData.friends.map(friend => {

    //         console.log("this is friend", friend)
    //         API.getUser(friend)
    //             .then(result => {

    //             setFriendsArray(friendsArray => [...friendsArray, result.data])
    //             })
    //     });
    // }, [userData, userData.friends]);

    // DELETE BOOK FUNCTION THAT COULD BE MODIFIED TO REMOVE FRIENDS
    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    // const handleDeleteBook = (bookId) => {
    //     // get token
    //     const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }
    //     API.deleteBook(bookId, token)
    //         // upon succes, update user data to reflect book change
    //         .then(() => userData.getUserData())
    //         .catch((err) => console.log(err));
    // };

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>

                <Container>
                    <h1>Viewing friends!</h1>
                </Container>

            </Jumbotron>

            <Container>
                <h2>
                    {friendsArray.length
                        ? `Viewing ${friendsArray.length} saved ${friendsArray.length === 1 ? 'friend' : 'friends'}:`
                        : 'You have no friends!'}
                    {console.log("hey there im in the header", friendsArray)}
                </h2>
                <CardColumns>
                    {friendsArray.map(friend => {
                        return (
                            <Card key={friend._id} border='dark'>
                                {friend.picture ? <Card.Img src={friend.picture} alt={friend.username} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{friend.username}</Card.Title>
                                    <p className='small'>Email: {friend.email}</p>
                                    <Button className='btn-block btn-danger' >
                                        Remove Friend
                                            </Button>
                                </Card.Body>
                            </Card>
                        );
                    })
                    }

                </CardColumns>
            </Container>
        </>
    );
}

export default SavedFriends;
