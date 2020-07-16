import React from 'react';

// model our saved book state for context
// running this gives us our Provider & Consumer
// we'll set all of this data in App.js and use it throughout other components!
const UserInfoContext = React.createContext({
  _id: '',
  username: '',
  email: '',
  picture: '',
  savedBooks: [],
  savedMusic: [],
  savedMovies: [],
  savedGames: [],
  savedLikes: [],
  bookCount: 0,
  musicCount: 0,
  movieCount: 0,
  gameCount: 0,
  friends: [],
  notifications: [],
  getUserData: () => undefined,
});

export default UserInfoContext;
