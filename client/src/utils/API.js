import axios from 'axios';

export const getAllUsers = function () {
  return axios.get('/api/users');
};

// route to get logged in user's info (needs the token)
export const getMe = function (token) {
  return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
};

// get a user by their username, not being used in the app just showing how it could work
export const getUser = function (username) {
  return axios.get(`/api/users/${username}`);
};

export const createUser = function (userData) {
  return axios.post('/api/users/books', userData);
};

export const loginUser = function (userData) {
  return axios.post('/api/users/login', userData);
};

// save book data for a logged in user
export const saveBook = function (bookData, token) {
  return axios.put('/api/users/books', bookData, { headers: { authorization: `Bearer ${token}` } });
};
// remove saved book data for a logged in user
export const deleteBook = function (bookId, token) {
  return axios.delete(`/api/users/books/${bookId}`, { headers: { authorization: `Bearer ${token}` } });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = function (query) {
  return axios.get('https://www.googleapis.com/books/v1/volumes', { params: { q: query } });
};

export const searchVideoGames = function (title, platform) {
  return axios({
    "method":"GET",
    "url":`https://chicken-coop.p.rapidapi.com/games/${title}`,
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"chicken-coop.p.rapidapi.com",
    "x-rapidapi-key":"ad79893db0msh519507ce219a2cep1942b9jsn16290fa29320",
    "useQueryString":true
    },"params":{
    "platform": platform
    }
    })
};

// save games
export const saveGame = function (gameData, token) {
  return axios.put('/api/users/games', gameData, { headers: { authorization: `Bearer ${token}` } });
};

// delete games
export const deleteGame = function (gameId, token) {
  return axios.delete(`/api/users/games/${gameId}`, { headers: { authorization: `Bearer ${token}` } });
};