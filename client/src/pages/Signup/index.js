import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SignupForm from '../../components/SignupForm';
import { Link } from "react-router-dom";
import UserInfoContext from '../../utils/UserInfoContext';
import "./style.css";

function Signup() {
  
  const userData = useContext(UserInfoContext);

  return (

    userData.username ? window.location.assign('/home') :
    
  
      <Row className="justify-content-center">
      <Col id="signup-card-column" xs={12} md={6} >
      <Container>
      <div className="signup-card">
      <SignupForm />
      <div className="login-link">
      <Link as={Link} to='/'>
        LOGIN
      </Link>
      </div>
      </div>
      </Container>
      </Col>
      </Row>
  );
}

export default Signup;