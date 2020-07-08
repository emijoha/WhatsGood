import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import { Link } from "react-router-dom";
import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { saveBook, searchGoogleBooks } from '../utils/API';

function Login() {
  

  return (
    <>
      <Container>
      <LoginForm />
      </Container>
      <Link as={Link} to='/signup'>
        Signup
      </Link>
    </>
  );
}

export default Login;