import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Jumbotron, Container, Form, CardColumns, Card, Button, Col, Row, Image } from 'react-bootstrap';

import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import * as API from '../../utils/API';
import LikeButton from '../../components/LikeButton';
import NotLoggedIn from '../../components/NotLoggedIn';
import FeedCard from '../../components/FeedCard';

import './style.css';

function ProfilePage() {

  const userData = useContext(UserInfoContext);
  console.log('userData: ', userData);

  const [bioUpdate, setBioUpdate] = useState(false);
  const [bioText, setBioText] = useState('');


  const updateBio = (bioText) => {
    console.log('bioText: ', bioText);

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    API.saveUserBio({ bioText }, token)
      .then(() => setBioText(''))
      .then(() => setBioUpdate(false))
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>
            {userData.username.toUpperCase()}'S PROFILE
          </h1>
        </Container>
      </Jumbotron>
      <Container fluid>
        <Col sm={2} md={3}>
          <Row className='justify-content-center'>
            <Image
              src={userData.picture}
              alt={`${userData.username}'s face, probably`}
              roundedCircle
              className='img-fluid'
            />
            {userData.username && (
              <>
                {(userData.bio !== '' || null)

                  ?
                  <>
                    <h6>
                      A little about me:
                    </h6>
                    <p>
                      {userData.bio}
                    </p>
                    <Button
                      className='btn btn-success'
                      onClick={() => setBioUpdate(true)}
                    >
                      Update Your Bio
                    </Button>
                  </>
                  :
                  <>
                    <Button
                      className='btn btn-success'
                      onClick={() => setBioUpdate(true)}
                    >
                      Add a Mini-Bio
                    </Button>

                    <>
                      {bioUpdate &&
                        <>
                          <Form>
                            <Col>
                              <Form.Control
                                name='bio-text'
                                value={bioText}
                                onChange={(e) => setBioText(e.target.value)}
                                type='text'
                                size='md'
                                as='textarea'
                                rows='6'
                                placeholder='enter your bio here'
                              />
                            </Col>
                          </Form>
                          <Button
                            className='btn btn-succes'
                            onClick={() => updateBio(bioText)}
                          >
                            Save Bio
                          </Button>
                        </>
                      }
                    </>
                  </>
                }

              </>
            )}
          </Row>
        </Col>
        <Col sm={10} md={9}>
          


        </Col>
      </Container>


    </>
  )
}

export default ProfilePage;