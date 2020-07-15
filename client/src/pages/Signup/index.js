import React from 'react';
import { Container } from 'react-bootstrap';
import SignupForm from '../../components/SignupForm';
import { Link } from "react-router-dom";

function Signup() {
  

  return (
    <>
      <Container>
      <SignupForm />
      </Container>
      <Link as={Link} to='/'>
        Login
      </Link>
    </>
  );
}

export default Signup;