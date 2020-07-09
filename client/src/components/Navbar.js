import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavDropdown } from 'react-bootstrap';
import UploadPhoto from './UploadPhoto';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';



function AppNavbar() {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // get username out of context object to display in nav
  const { username } = useContext(UserInfoContext);


  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/home'>
            What's Good?
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/search-user'>
                Search For Friends
              </Nav.Link>

              <NavDropdown title="Search Media" id="basic-nav-dropdown">
                <NavDropdown.Item href="/search_books">Search Books</NavDropdown.Item>
                <NavDropdown.Item href="/search_music">Search Music</NavDropdown.Item>
                <NavDropdown.Item href="/search_movies">Search Movies</NavDropdown.Item>
                <NavDropdown.Item href="/search_games">Search Games</NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="See My Media" id="basic-nav-dropdown">
                <NavDropdown.Item href='/saved_media'>All My Media</NavDropdown.Item>
                <NavDropdown.Item href='/saved_books'>My Books</NavDropdown.Item>
                <NavDropdown.Item href="/saved_music">My Music</NavDropdown.Item>
                <NavDropdown.Item href="/saved_movies">My Movies</NavDropdown.Item>
                <NavDropdown.Item href="/saved_games">My Games</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown alignRight title={username} >

                <NavDropdown.Item onClick={() => setShowModal(true)}>Upload Profile Pic</NavDropdown.Item>

                <NavDropdown.Item onClick={AuthService.logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal size='lg' show={showModal} onHide={() => setShowModal(false)} aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='upload-photo-modal'>
              Upload Photo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <UploadPhoto handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>

    </>
  );
}

export default AppNavbar;
