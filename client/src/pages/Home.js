import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';


function Home() {

  const userData = useContext(UserInfoContext);
  
  console.log(userData);
 

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Home Page!</h1>
        </Container>
      </Jumbotron>
      <Container>
          <h1>Hi y'all this is my home page!</h1>
        </Container>
    </>
  );
}

export default Home;