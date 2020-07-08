import React from 'react';

// model our saved book state for context
// running this gives us our Provider & Consumer
// we'll set all of this data in App.js and use it throughout other components!
const UserInfoContext = React.createContext({
  savedBooks: [],
  savedMusic: [],
  savedMovies: [],
  username: '',
  picture: '',
  email: '',
  bookCount: 0,
  musicCount: 0,
  movieCount: 0,
  getUserData: () => undefined,
});

export default UserInfoContext;
