import React, { useState, useContext } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import "./style.css";
import { searchFriend } from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchFriends({ sendSearchedUserToList }) {


    const [searchInput, setSearchInput] = useState('');
  


    // create method to search for users and set state on form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("clicked", searchInput)

        if (!searchInput) {
            return false;
        }

        searchFriend(searchInput)
            .then(user => {

                sendSearchedUserToList(user.data)
            
            
          },
                setSearchInput(''));
            
            ;
            
            
    }


    return (
      <div>
        SEARCH FRIENDS
       
      <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={11} md={11} lg={10}>
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
                            <Col xs={1} md={1} lg={2}>
                                <Button id="search-icon-button" type='submit' variant='success' size='lg'>
                                    <FontAwesomeIcon  icon={faSearch} size={'lg'} />
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
      
      </div>

    );

}

export default SearchFriends;