// see SignupForm.js for comments

import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';
import { loginUser } from '../utils/API';
import AuthService from '../utils/auth';

function LoginForm() {
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [validated, setValidation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorText, setErrorText] = useState('');

  const userData = useContext(UserInfoContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    loginUser(userFormData)
      .then(({ data }) => {
        console.log(data);
        AuthService.login(data.token);
        userData.getUserData();
      })
      .catch((err) => {
        console.log(err.response);
        setShowAlert(true);
        setErrorText(err.response.data.message);
      });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          {errorText || 'Something went wrong with your login credentials!'}
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button disabled={!(userFormData.username && userFormData.password)} type='submit' variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
