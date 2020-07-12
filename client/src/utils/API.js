import axios from 'axios';

export const getAllUsers = function () {
  return axios.get('/api/users');
};

// route to get logged in user's info (needs the token)
export const getMe = function (token) {
  return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
};

// get a user by their username, not being used in the app just showing how it could work
export const getUser = function (id) {
  return axios.get(`/api/users/${id}`);
};

export const searchFriend = function (username) {
  return axios.get(`/api/users/find/${username}`);
};

export const createUser = function (userData) {
  return axios.post('/api/users/signup', userData);
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
export const searchMusic = function(query) {
    return axios({
      "method":"GET",
      "url":"https://deezerdevs-deezer.p.rapidapi.com/search",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key":"f2e833be47mshec0532931a48159p122a41jsn86eecf30e6d3",
      "useQueryString":true
      },"params":{
      "q":query
      }
      })
 
};

export const saveMusic = function (musicData, token) {
  return axios.put('/api/users/music', musicData, { headers: { authorization: `Bearer ${token}` } });
};

export const savePicture = function (pictureData, token) {
  console.log(pictureData, token);
  return axios.put('/api/users/picture', pictureData, { headers: { authorization: `Bearer ${token}` } });
};

export const deleteMusic = function (musicId, token) {
  return axios.delete(`/api/users/music/${musicId}`, { headers: { authorization: `Bearer ${token}` } });
};

export const searchOMDB = function (query) {
  console.log(query);
  return axios.get(`http://www.omdbapi.com/?apikey=671512a8&s=${query}`, { params: { q: query } });
};

export const searchEachMovie = function (query) {
  console.log(query);
  return axios.get(`http://www.omdbapi.com/?apikey=671512a8&i=${query}`, { params: { q: query } });
};

export const saveMovie = function (movieData, token) {
  return axios.put('/api/users/movies', movieData, { headers: { authorization: `Bearer ${token}` } });
};

export const deleteMovie = function (movieId, token) {
  return axios.delete(`/api/users/movies/${movieId}`, { headers: { authorization: `Bearer ${token}` } });
};

// save friend data for a logged in user
export const saveFriend = function (userData, token) {
  return axios.put('/api/users/friends', userData, { headers: { authorization: `Bearer ${token}` } });
};

// save friend data for a logged in user
export const deleteFriend = function (friendId, token) {
  console.log("friend id delete", friendId)
  return axios.delete(`/api/users/friends/${friendId}`, { headers: { authorization: `Bearer ${token}` } });
};

