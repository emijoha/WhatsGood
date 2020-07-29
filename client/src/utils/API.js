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

export const searchAllUsers = function (anyname) {
  return axios.get(`/api/users/search-all/${anyname}`);
}

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
export const deleteBook = function (book_id, token) {
  return axios.delete(`/api/users/books/${book_id}`, { headers: { authorization: `Bearer ${token}` } });
};

export const getBook = function (book_id) {
  return axios.get(`/api/users/books/${book_id}`);
};
// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = function (query) {
  return axios.get('https://www.googleapis.com/books/v1/volumes', { params: { q: query } });
};

export const searchVideoGames = function (title, platform) {
  return axios({
    "method": "GET",
    "url": `https://chicken-coop.p.rapidapi.com/games/${title}`,
    "headers": {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
      "x-rapidapi-key": "ad79893db0msh519507ce219a2cep1942b9jsn16290fa29320",
      "useQueryString": true
    }, "params": {
      "platform": platform
    }
  })
};

// save games
export const saveGame = function (gameData, token) {
  return axios.put('/api/users/games', gameData, { headers: { authorization: `Bearer ${token}` } });
};

// delete games
export const deleteGame = function (game_id, token) {
  return axios.delete(`/api/users/games/${game_id}`, { headers: { authorization: `Bearer ${token}` } });
};

export const getGame = function (game_id) {
  return axios.get(`/api/users/games/${game_id}`);
};

export const searchMusic = function (query) {
  return axios({
    "method": "GET",
    "url": "https://deezerdevs-deezer.p.rapidapi.com/search",
    "headers": {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "f2e833be47mshec0532931a48159p122a41jsn86eecf30e6d3",
      "useQueryString": true
    }, "params": {
      "q": query
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

export const saveUserBio = function (userBio, token) {
  console.log('userBio: ', userBio)
  return axios.put('/api/users/user-bio', userBio, { headers: { authorization: `Bearer ${token}` } });
}

export const deleteMusic = function (music_id, token) {
  return axios.delete(`/api/users/music/${music_id}`, { headers: { authorization: `Bearer ${token}` } });
};

export const getMusic = function (music_id) {
  return axios.get(`/api/users/music/${music_id}`);
};

export const searchOMDB = function (query) {
  console.log(query);
  return axios.get(`https://www.omdbapi.com/?apikey=671512a8&s=${query}`, { params: { q: query } });
};

export const searchEachMovie = function (query) {
  console.log(query);
  return axios.get(`https://www.omdbapi.com/?apikey=671512a8&i=${query}`, { params: { q: query } });
};

export const saveMovie = function (movieData, token) {
  return axios.put('/api/users/movies', movieData, { headers: { authorization: `Bearer ${token}` } });
};

export const saveUserReview = function (userReview, token) {
  console.log(userReview, token);
  return axios.put('/api/users/user-review', userReview, { headers: { authorization: `Bearer ${token}` } });
};

export const saveUserRating = function (userRating, token) {
  console.log('userRating: ', userRating, token);
  return axios.put('/api/users/user-rating', userRating, { headers: { authorization: `Bearer ${token}` } });
};

export const deleteMedia = function (media_id, media_mediaType, token) {
  return axios.delete(`/api/users/media/${media_mediaType}/${media_id}`, { headers: { authorization: `Bearer ${token}` } });
}

export const deleteMovie = function (movie_id, token) {
  return axios.delete(`/api/users/movies/${movie_id}`, { headers: { authorization: `Bearer ${token}` } });
};

export const getMovie = function (movie_id) {
  return axios.get(`/api/users/movies/${movie_id}`);
};

// save friend data for a logged in user
export const saveFriend = function (userData, token) {
  return axios.put('/api/users/friends', userData, { headers: { authorization: `Bearer ${token}` } });
};

export const saveLike = function (likeData, token) {
  console.log('likeData from API: ', likeData, 'userToken: ', token);
  return axios.put('/api/users/likes', likeData, { headers: { authorization: `Bearer ${token}` } });
};
// save friend data for a logged in user
export const deleteFriend = function (friend_id, token) {
  console.log("friend id delete", friend_id)
  return axios.delete(`/api/users/friends/${friend_id}`, { headers: { authorization: `Bearer ${token}` } });
};

export const addLike = function (likeData, token) {
  console.log('addLike like data', likeData, token);

  if (likeData.mediaType === "book") {
    return axios.put(`/api/users/books/${likeData._id}`, likeData, { headers: { authorization: `Bearer ${token}` } });
  }

  if (likeData.mediaType === "movie") {
    return axios.put(`/api/users/movies/${likeData._id}`, likeData, { headers: { authorization: `Bearer ${token}` } });
  }

  if (likeData.mediaType === "music") {
    return axios.put(`/api/users/music/${likeData._id}`, likeData, { headers: { authorization: `Bearer ${token}` } });
  }

  if (likeData.mediaType === "game") {
    return axios.put(`/api/users/games/${likeData._id}`, likeData, { headers: { authorization: `Bearer ${token}` } });
  }
};

export const addNotification = function (notificationData, token) {
  return axios.put('/api/users/notifications', notificationData, { headers: { authorization: `Bearer ${token}` } });
};

export const deleteNotification = function (notificationId) {
  console.log('notification id', notificationId)
  return axios.delete(`/api/users/notifications/${notificationId}`, notificationId);
};

export const addComment = function (commentData, token) {
  console.log("comment data:", commentData, "token:", token);

  if (commentData.mediaType === "book") {
    return axios.put(`/api/users/books/comments/${commentData.mediaId}`, commentData, { headers: { authorization: `Bearer ${token}` } });
  }

  if (commentData.mediaType === "movie") {
    return axios.put(`/api/users/movies/comments/${commentData.mediaId}`, commentData, { headers: { authorization: `Bearer ${token}` } });
  }

  if (commentData.mediaType === "music") {
    return axios.put(`/api/users/music/comments/${commentData.mediaId}`, commentData, { headers: { authorization: `Bearer ${token}` } });
  }

  if (commentData.mediaType === "game") {
    return axios.put(`/api/users/games/comments/${commentData.mediaId}`, commentData, { headers: { authorization: `Bearer ${token}` } });
  }
};


export const saveChat = function (chatData, token) {
  return axios.put('/api/users/chats', chatData, { headers: { authorization: `Bearer ${token}` } });
};

export const saveMessage = function (messageData, token) {
  return axios.put('/api/users/messages', messageData, { headers: { authorization: `Bearer ${token}` } });
};

export const makeFavorite = function (favorite, token) {
  console.log(favorite);
  return axios.put('/api/users/make-favorite', favorite, { headers: { authorization: `Bearer ${token}` } });
};

export const getMedia = function (request) {
  return axios.get(`/api/users/all-media/${request}`);
};


export const deleteThisMedia = function (mediaId) {
  console.log('media id', mediaId)
  return axios.delete(`/api/users/all-media/${mediaId}`, mediaId);
};

