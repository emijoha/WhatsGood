import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavDropdown } from 'react-bootstrap';
import UploadPhoto from '../UploadPhoto';
import ProfilePic from '../ProfilePic';
import "./style.css";

import NotificationDropdownItem from '../NotificationDropdownItem/NotificationDropdownItem';
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';



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
      <Navbar sticky="top" expand='lg' id="new-navbar">
        <Container fluid id='nav-container'>
          {userData.username
            ? <span>
              <Navbar.Brand className='shorten' id='purple-hover' as={Link} to='/home'>
                <p className='logo-text-main'>WHAT'S GOOD<span>&nbsp;</span></p>
              </Navbar.Brand>
              <Navbar.Brand id='neon-hover' as={Link} to='/profile'>
                <p className='logo-text-main'>{`${userData.username.toUpperCase()}?`}</p>
              </Navbar.Brand>
            </span>
            :
            <Navbar.Brand id='purple-hover' as={Link} to='/'>
              <p className='logo-text-main'>WHAT'S GOOD</p>
            </Navbar.Brand>
          }
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar-group'>
            <Nav className='ml-auto'>
              <Nav.Link className="nav-link-group" as={Link} to='/search_music'>
                SEARCH
              </Nav.Link>
              {/* {userData.username
                ? <NavDropdown className="nav-link-group" title="SEARCH" id="basic-nav-dropdown" >
                  <NavDropdown.Item href="/search_user">SEARCH FOR FRIENDS</NavDropdown.Item>
                  <NavDropdown.Item href="/search_books">SEARCH BOOKS</NavDropdown.Item>
                  <NavDropdown.Item href="/search_music">SEARCH MUSIC</NavDropdown.Item>
                  <NavDropdown.Item href="/search_movies">SEARCH MOVIES</NavDropdown.Item>
                  <NavDropdown.Item href="/search_games">SEARCH GAMES</NavDropdown.Item>
                </NavDropdown>
                : <NavDropdown className="nav-link-group" title="SEARCH" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/search-user">SEARCH FOR FRIENDS</NavDropdown.Item>
                  <NavDropdown.Item href="/search_books">SEARCH BOOKS</NavDropdown.Item>
                  <NavDropdown.Item href="/search_music">SEARCH MUSIC</NavDropdown.Item>
                  <NavDropdown.Item href="/search_movies">SEARCH MOVIES</NavDropdown.Item>
                  <NavDropdown.Item href="/search_games">SEARCH GAMES</NavDropdown.Item>
                </NavDropdown>
              } */}
              {userData.username &&
                <Nav.Link className="nav-link-group" as={Link} to='/saved_media'>
                  MY MEDIA
              </Nav.Link>
              }
              {/* {userData.username &&
                <NavDropdown className="nav-link-group" title="MY MEDIA" id="basic-nav-dropdown">
                  <NavDropdown.Item href='/saved_media'>ALL MY MEDIA</NavDropdown.Item>
                  <NavDropdown.Item href='/saved_books'>MY BOOKS</NavDropdown.Item>
                  <NavDropdown.Item href="/saved_music">MY MUSIC</NavDropdown.Item>
                  <NavDropdown.Item href="/saved_movies">MY MOVIES</NavDropdown.Item>
                  <NavDropdown.Item href="/saved_games">MY GAMES</NavDropdown.Item>
                </NavDropdown>
              } */}
              {userData.username &&
                <Nav.Link className="nav-link-group" as={Link} to='/saved_friends'>
                  MY FRIENDS
              </Nav.Link>
              }
              {userData.notifications.length > 0 &&
                (<h4>{userData.notifications.length}</h4>)
              }
              {userData.username &&
                <NavDropdown
                  alignRight
                  title={<ProfilePic picture={userData.picture} username={userData.username} />}
                >
                  <NavDropdown.Item onClick={() => setShowModal(true)}>UPLOAD PROFILE PIC</NavDropdown.Item>
                  <NavDropdown.Item href="/profile">MY PROFILE</NavDropdown.Item>
                  {userData.notifications.length
                    ? <div className='notification-scroll'>
                      {userData.notifications.map((notification) => {
                        { console.log("notification in navbar", notification) }
                        return (
                          <NotificationDropdownItem
                            likerUsername={notification.likerUsername}
                            title={notification.title}
                            notificationId={notification._id}
                            type={notification.type}
                            mediaType={notification.mediaType}
                            mediaId={notification.mediaId}
                            followerId={notification.followerId}
                            comment={notification.comment} />
                        )
                      })}
                    </div>
                    : null
                  }
                  <NavDropdown.Item href="/messages">MESSAGES</NavDropdown.Item>
                  <NavDropdown.Item onClick={AuthService.logout}>LOGOUT</NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal size='md' show={showModal} onHide={() => setShowModal(false)} aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='upload-photo-modal' className='logo-text-main'>
              UPLOAD YOUR PHOTO
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
