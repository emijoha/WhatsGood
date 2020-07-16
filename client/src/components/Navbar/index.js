import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavDropdown } from 'react-bootstrap';
import UploadPhoto from '../UploadPhoto';
import ProfilePic from '../ProfilePic';
import "./style.css";

import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';



function AppNavbar() {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // get username out of context object to display in nav
  const { username, picture  } = useContext(UserInfoContext);


  return (
    <>
      <Navbar sticky="top" expand='lg' id="new-navbar">
        <Container fluid>
          {username ? <Navbar.Brand id="navbar-brand" as={Link} to='/home'>
            <h5>WHAT'S GOOD</h5>
          </Navbar.Brand> : 
          <Navbar.Brand id="navbar-brand" as={Link} to='/'>
            <h5>WHAT'S GOOD</h5>
          </Navbar.Brand>}

          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar-group'>
            <Nav className='ml-auto'>

          
              {/* <Nav.Link className="nav-link-group" as={Link} to='/search-user'>
                Search For Friends
              </Nav.Link> */}
             
              
              
              {username ?
              
              <NavDropdown className="nav-link-group" title="SEARCH" id="basic-nav-dropdown" >
                <NavDropdown.Item href="/search-user">SEARCH FOR FRIENDS</NavDropdown.Item>
                <NavDropdown.Item href="/search_books">SEARCH BOOKS</NavDropdown.Item>
                <NavDropdown.Item href="/search_music">SEARCH MUSIC</NavDropdown.Item>
                <NavDropdown.Item href="/search_movies">SEARCH MOVIES</NavDropdown.Item>
                <NavDropdown.Item href="/search_games">SEARCH GAMES</NavDropdown.Item>
              </NavDropdown>

              :

              <NavDropdown className="nav-link-group" title="SEARCH" id="basic-nav-dropdown" alignRight>
                <NavDropdown.Item href="/search-user">SEARCH FOR FRIENDS</NavDropdown.Item>
                <NavDropdown.Item href="/search_books">SEARCH BOOKS</NavDropdown.Item>
                <NavDropdown.Item href="/search_music">SEARCH MUSIC</NavDropdown.Item>
                <NavDropdown.Item href="/search_movies">SEARCH MOVIES</NavDropdown.Item>
                <NavDropdown.Item href="/search_games">SEARCH GAMES</NavDropdown.Item>
              </NavDropdown>
              
              
              }


              {username && <NavDropdown className="nav-link-group" title="MY MEDIA" id="basic-nav-dropdown">
                <NavDropdown.Item href='/saved_media'>ALL MY MEDIA</NavDropdown.Item>
                <NavDropdown.Item href='/saved_books'>MY BOOKS</NavDropdown.Item>
                <NavDropdown.Item href="/saved_music">MY MUSIC</NavDropdown.Item>
                <NavDropdown.Item href="/saved_movies">MY MOVIES</NavDropdown.Item>
                <NavDropdown.Item href="/saved_games">MY GAMES</NavDropdown.Item>
              </NavDropdown>}

              {username && <Nav.Link className="nav-link-group" as={Link} to='/saved-friends'>
                MY FRIENDS
              </Nav.Link>}
              
              
              {username && <NavDropdown className="btn dropdown-toggle" data-toggle="dropdown" alignRight title={
                <ProfilePic 
                  picture={picture}
                  username={username}
                />
              } >

                <NavDropdown.Item onClick={() => setShowModal(true)}>UPLOAD PROFILE PIC</NavDropdown.Item>

                <NavDropdown.Item onClick={AuthService.logout}>LOGOUT</NavDropdown.Item>
              </NavDropdown>}
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
