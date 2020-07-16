import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavDropdown, Button } from 'react-bootstrap';
import UploadPhoto from './UploadPhoto';
import ProfilePic from './ProfilePic/ProfilePic';
import NotificationDropdownItem from './NotificationDropdownItem/NotificationDropdownItem';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';



function AppNavbar() {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // get username out of context object to display in nav
  // const { username, picture, notifications  } = useContext(UserInfoContext);
  const userData = useContext(UserInfoContext);

  useEffect(() => {
    userData.getUserData();
  }, []);

  // <NavDropdown.Item>{notification.likerUsername} liked your post of "{notification.title}"<Button>Oh, word!</Button></NavDropdown.Item>

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          {userData.username ? <Navbar.Brand as={Link} to='/home'>
            What's Good?
          </Navbar.Brand> :
            <Navbar.Brand as={Link} to='/'>
              What's Good?
          </Navbar.Brand>}
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/search-user'>
                Search For Friends
              </Nav.Link>
              {userData.username && <Nav.Link as={Link} to='/saved-friends'>
                View Friends
              </Nav.Link>}

              <NavDropdown title="Search Media" id="basic-nav-dropdown">
                <NavDropdown.Item href="/search_books">Search Books</NavDropdown.Item>
                <NavDropdown.Item href="/search_music">Search Music</NavDropdown.Item>
                <NavDropdown.Item href="/search_movies">Search Movies</NavDropdown.Item>
                <NavDropdown.Item href="/search_games">Search Games</NavDropdown.Item>
              </NavDropdown>

              {console.log("notifications length", userData.notifications.length)}
              {userData.username && <NavDropdown title="See My Media" id="basic-nav-dropdown">
                <NavDropdown.Item href='/saved_media'>All My Media</NavDropdown.Item>
                <NavDropdown.Item href='/saved_books'>My Books</NavDropdown.Item>
                <NavDropdown.Item href="/saved_music">My Music</NavDropdown.Item>
                <NavDropdown.Item href="/saved_movies">My Movies</NavDropdown.Item>
                <NavDropdown.Item href="/saved_games">My Games</NavDropdown.Item>
              </NavDropdown>}

              {userData.notifications.length > 0 && (<h4>{userData.notifications.length}</h4>)}



              {userData.username && <NavDropdown alignRight title={
                <ProfilePic
                  picture={userData.picture}
                  username={userData.username}
                />
              } >

                <NavDropdown.Item onClick={() => setShowModal(true)}>Upload Profile Pic</NavDropdown.Item>

                {userData.notifications.map((notification) => {
                  {console.log("notification in navbar", notification)}
                  return (
                    <NotificationDropdownItem
                    likerUsername={notification.likerUsername}
                    title={notification.title}
                    notificationId={notification._id}/>
                    
                  )
                })}

                <NavDropdown.Item onClick={AuthService.logout}>Logout</NavDropdown.Item>
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
