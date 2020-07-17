import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm';
import { Link } from "react-router-dom";
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import { saveBook, searchGoogleBooks } from '../../utils/API';
import "./style.css";

function Login() {
  
  const userData = useContext(UserInfoContext);

  return (

    userData.username ? window.location.assign('/home') :

    <>
     
     <Row className="justify-content-center">
      <Col xs={12} md={6} >
      <div className="login-card">
      <LoginForm />
      <div className="signup-link"> 
      <Link  as={Link} to='/signup'>
        SIGNUP
      </Link>
      </div>
      </div>
      </Col>
      </Row>
      
    </>
  );
}

export default Login;