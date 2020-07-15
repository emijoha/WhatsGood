import React, { useContext, useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import NotLoggedIn from '../components/NotLoggedIn/NotLoggedIn';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import * as API from '../utils/API';

function SavedFriends() {
    // const [friendsArray, setFriendsArray] = useState([]);
    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);
    // useEffect(() => {
    //     console.log("user data Id", userData)

    //     if (userData._id !== '') {
    //         API.getUser(userData._id)
    //             .then(result => {
    //                 console.log("RESULT DATA FRIENDS", result.data.friends);
    //                 setFriendsArray(friendsArray => [...friendsArray], result.data.friends);
    //             });
    //     }

    // }, [userData]);


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

    // create function that accepts the friend's mongo _id value as param and deletes the friend from current user's collection
    const handleDeleteFriend = (friend_id) => {
        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }

        API.deleteFriend(friend_id, token)
            // upon succes, update user data to reflect book change
            .then(() => userData.getUserData(),
            console.log("made it back"))
            .catch((err) => console.log(err));
    };

    return (
        <>
            {userData.username ? 
                <>
                <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Viewing friends!</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.friends.length
                        ? `Viewing ${userData.friends.length} saved ${userData.friends.length === 1 ? 'friend' : 'friends'}:`
                        : 'You have no friends!'}
                    {console.log("hey there im in the header", userData.friends)}
                </h2>
                <CardColumns>
                    {userData.friends.map(friend => {
                        console.log("this is my friend, ", friend)
                        return (
                            <Card key={friend._id} border='dark'>
                                {friend.picture ? <Card.Img src={friend.picture} alt={friend.username} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{friend.username}</Card.Title>
                                    <p className='small'>Email: {friend.email}</p>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteFriend(friend._id)}>
                                        Remove Friend
                                            </Button>
                                </Card.Body>
                            </Card>
                        );
                    })
                    }
                </CardColumns>
            </Container> 
            </> :
            <NotLoggedIn />}
        </>
    );
}

export default SavedFriends;
