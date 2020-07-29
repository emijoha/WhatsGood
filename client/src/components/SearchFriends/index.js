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
    <div id='message-form-div'>
      <span>&nbsp;&nbsp;</span>SEARCH FRIENDS

      <Form onSubmit={handleFormSubmit}>
        <Form.Row>
          <Col xs={11} md={11} lg={10}>
            <Form.Control
              id="mess-form-input"
              name='searchInput'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              size='lg'
              placeholder='Search a friend to message'
            />
          </Col>
          <Col xs={1} md={1} lg={2} id='search-friend-grouping'>
            <a id="search-icon-button" onClick={handleFormSubmit} size='lg'>
              <FontAwesomeIcon id='search-friend-icon' icon={faSearch} size={'lg'} />
            </a>
          </Col>
        </Form.Row>
      </Form>

    </div>

  );

}

export default SearchFriends;