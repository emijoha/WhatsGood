import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import "./style.css";

import UserInfoContext from '../../utils/UserInfoContext';
import { createUser } from '../../utils/API';
import AuthService from '../../utils/auth';

function SignupForm() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated, setValidation] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [errorText, setErrorText] = useState('');

  // get context object from app.js
  const userData = useContext(UserInfoContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    // send new user data to server, receiving the JWT and user data in return
    createUser(userFormData)
      .then(({ data: { token, user } }) => {
        // set token to localstorage
        AuthService.login(token);
        // execute function from context api in app.js to update state for logged in user
        userData.getUserData();
        // close modal
     
      })
      .catch((err) => {
        console.log(err.response);
        setShowAlert(true);
        setErrorText(err.response.data.message);
      });
  };

  return (
    <div className="form-outer-div">
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <h5 id='heading-login'>SIGNUP</h5>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          {errorText || 'Something went wrong with your signup!'}
        </Alert>

        <Form.Group>
          <Form.Label id="form-label" htmlFor='username'>USERNAME</Form.Label>
          <Form.Control
            id="form-input-signup"
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
          <Form.Label id="form-label" htmlFor='email'>EMAIL</Form.Label>
          <Form.Control
            id="form-input-signup"
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label id="form-label" htmlFor='password'>PASSWORD</Form.Label>
          <Form.Control
            id="form-input-signup"
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <div className="text-right">
        <Button
          id="form-button-signup"
          // disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          >
          SUBMIT
        </Button>
        </div>
      </Form>
    </div>
  );
}

export default SignupForm;
