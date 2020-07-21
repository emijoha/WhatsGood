import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import SearchCards from '../../components/SearchCards';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { saveFriend, searchFriend, deleteFriend } from '../../utils/API';

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

        // NEED TO PASS SEARCHINPUT AS PARAMS.USERNAME
        searchFriend(searchInput)
            .then(user => setSearchedUser({
                username: user.data.username,
                _id: user.data._id,
                picture: user.data.picture,
                email: user.data.email
            }),
                setSearchInput(''));
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
                userData.getUserData();
            })
            .catch((err) => console.log(err));
    };

    const handleDeleteFriend = (friend_id) => {
        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }

        deleteFriend(friend_id, token)
            // upon succes, update user data to reflect book change
            .then(() => userData.getUserData(),
                console.log("made it back"))
            .catch((err) => console.log(err));
    };

    return (
        <div id="container">
            <div id="inner-container">
                <Container>
                <h5 id="search-header">SEARCH FRIENDS</h5>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    id="form-input"
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a friend by user name'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button id="form-button" type='submit' variant='success' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </div>
            {searchedUser._id &&
                <Container>
                    <SearchCards
                        cardType='searchedUsers'
                        searchedUser={searchedUser}
                        savedArray={userData.friends}
                        handleSaveFriend={handleSaveFriend}
                        handleDeleteFriend={handleDeleteFriend}
                    />
                </Container>
            }
        </div>
    );
}

export default SearchUser;