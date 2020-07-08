import React from 'react';

// model our saved book state for context
// running this gives us our Provider & Consumer
// we'll set all of this data in App.js and use it throughout other components!
const UserInfoContext = React.createContext({
  savedBooks: [],
  savedGames: [],
  username: '',
  email: '',
  bookCount: 0,
  gameCount: 0,
  getUserData: () => undefined,
});

export default UserInfoContext;
