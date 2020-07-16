import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Col, Row } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment'
import "./style.css";

// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import * as API from '../../utils/API';
import LikeButton from '../../components/LikeButton'


function Home() {


  const [allFriendsMediaState, setAllFriendsMediaState] = useState([]);



  function compareTimeStamp(a, b) {
    return b.timeStamp - a.timeStamp;
  }

  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);



  useEffect(() => {

    userData.friends.map(friend => {



      API.getUser(friend.id)
        .then(result => {
  
          if (result.data.savedBooks.length > 0) {

            result.data.savedBooks.map(savedBook => {

              let savedBookData = {
                mediaType: "book",
                timeStamp: savedBook.timeStamp,
                createdAt: savedBook.createdAt,
                _id: savedBook._id,
                username: friend.username,
                picture: friend.picture,
                userId: friend.id,
                image: savedBook.image,
                title: savedBook.title,
                authors: savedBook.authors,
                description: savedBook.description,
                likes: savedBook.likes
              }


              console.log("this is savedBookData: ", savedBookData)
              console.log("this is savedBook: ", savedBook)

              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedBookData].sort(compareTimeStamp))


            })


          }


          if (result.data.savedMusic.length > 0) {

            result.data.savedMusic.map(savedMusic => {

              let savedMusicData = {
                mediaType: "music",
                timeStamp: savedMusic.timeStamp,
                createdAt: savedMusic.createdAt,
                _id: savedMusic._id,
                username: friend.username,
                picture: friend.picture,
                image: savedMusic.image,
                title: savedMusic.title,
                link: savedMusic.link,
                artist: savedMusic.artist,
                preview: savedMusic.preview,
                likes: savedMusic.likes
              }


              console.log("this is savedBookData: ", savedMusicData)


              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedMusicData].sort(compareTimeStamp))


            })


          }

          if (result.data.savedMovies.length > 0) {

            result.data.savedMovies.map(savedMovie => {


              let savedMovieData = {
                mediaType: "movie",
                timeStamp: savedMovie.timeStamp,
                createdAt: savedMovie.createdAt,
                _id: savedMovie._id,
                username: friend.username,
                picture: friend.picture,
                image: savedMovie.image,
                title: savedMovie.title,
                runtime: savedMovie.runtime,
                released: savedMovie.released,
                rated: savedMovie.rated,
                plot: savedMovie.plot,
                genre: savedMovie.genre,
                director: savedMovie.director,
                actors: savedMovie.actors,
                likes: savedMovie.likes
              }





              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedMovieData].sort(compareTimeStamp))


            })


          }


          if (result.data.savedGames.length > 0) {

            result.data.savedGames.map(savedGame => {


              let savedGameData = {
                mediaType: "game",
                timeStamp: savedGame.timeStamp,
                createdAt: savedGame.createdAt,
                _id: savedGame._id,
                username: friend.username,
                picture: friend.picture,
                image: savedGame.image,
                title: savedGame.title,
                developer: savedGame.developer,
                description: savedGame.description,
                likes: savedGame.likes
              }





              setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, savedGameData].sort(compareTimeStamp))


            })


          }


        // }

        // )

      })

    });


  // }, [userData, userData.friends]);
}, [userData.username]);


  const handleSaveLike = useCallback((likeMediaType, like_id, mediaLikes) => {
    // find the friend in `searchedUser` state by the matching id
    // const userToSave = searchedUser.find((user) => user._id === userId);

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
        return false;
    }

    

    let likeData = {
      mediaType: likeMediaType,
      mediaId: like_id,
    }

    let addLikeData = {
      mediaType: likeMediaType,
      _id: like_id,
      likes: mediaLikes
    }

    console.log("data for like, ", likeData)
    // send the friend data to our api
    API.saveLike(likeData, token)
        .then(() => {
          console.log("Token: ", token, "likeData: ", likeData);
            userData.getUserData();
       

        })
        .catch((err) => console.log(err));

    API.addLike(addLikeData, token)
        .then(() => {
         
            userData.getUserData();
       

        })
        .catch((err) => console.log(err));     
  });





  console.log("this is allFriendsMediaState outside of the loop: ", allFriendsMediaState);


  // DELETE BOOK FUNCTION THAT COULD BE MODIFIED TO REMOVE FRIENDS
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // const handleDeleteBook = (bookId) => {
  //     // get token
  //     const token = AuthService.loggedIn() ? AuthService.getToken() : null;

  //     if (!token) {
  //         return false;
  //     }
  //     API.deleteBook(bookId, token)
  //         // upon succes, update user data to reflect book change
  //         .then(() => userData.getUserData())
  //         .catch((err) => console.log(err));
  // };

  return (



    <>
      <Jumbotron fluid className='text-light bg-dark'>

        <Container>
          <h1>Viewing friends Media!</h1>
        </Container>

      </Jumbotron>

      <Container >
        <Row className="justify-content-center">
          <h2>
            My Feed
                </h2>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} >


            {allFriendsMediaState.map(media => {
              // if (friend.savedMusic === []) {
              //   return
              // }

              if (media.mediaType === "book") {

                  
                return (

                  <Card key={media._id} border='dark'>

                    <Card.Body>
                      {media.picture ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' /> : null}
                      
                      <Card.Text>{media.username}</Card.Text>
                      <Card.Text>{moment(media.createdAt).calendar()}</Card.Text>
                     
                      {media.image ? <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' /> : null}
                      <Card.Title>{media.title}</Card.Title>
                      <p className='small'>Authors: {media.authors}</p>
                      <Card.Text>{media.description}</Card.Text>
                      
                     
                      <LikeButton mediaLikes={media.likes} 
                                  mediaType={media.mediaType}
                                  mediaId={media._id}
                                  cb={handleSaveLike}
                                  userData={userData}
                                  
                                  
                                  ></LikeButton>
                      <Button className='btn-block btn-danger' >
                        Comment
                      </Button>
                    </Card.Body>
                  </Card>)

              }

              if (media.mediaType === "music") {

                return (


                  <Card key={media._id} border='dark'>
                    <Card.Body>
                      {media.picture ? <Card.Img id="profile-pic"  src={media.picture} alt={media.username} variant='top' /> : null}

                      <Card.Text>{media.username}</Card.Text>
                      <Card.Text>{moment(media.createdAt).calendar()}</Card.Text>
                      <Card.Img id="media-pic" src={media.image} alt={media.artist} variant='top' />
                      <Card.Title>{media.title}</Card.Title>

                      <p className='small'>Artist: {media.artist}</p>
                    
                      <ReactAudioPlayer id="music-player"
                        src={media.preview}
                        controls
                      />
                      <LikeButton mediaLikes={media.likes} 
                                  mediaType={media.mediaType}
                                  mediaId={media._id}
                                  cb={handleSaveLike}
                                  userData={userData}          
                      ></LikeButton>
                      <Button className='btn-block btn-danger' >
                        Comment
                      </Button>
                    </Card.Body>
                  </Card>)



              }

              if (media.mediaType === "movie") {

                return (


                  <Card key={media._id} border='dark'>
                    
                    <Card.Body>

                    {media.picture ? <Card.Img id="profile-pic"  src={media.picture} alt={media.username} variant='top' /> : null}
                      <Card.Text>{media.username}</Card.Text>
                      <Card.Text>{moment(media.createdAt).calendar()}</Card.Text>
                      {media.image ? <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' /> : null}
                      <Card.Title>{media.title}</Card.Title>
                      <p className='small'>Released: {media.released}</p>
                      <p className='small'>Actors: {media.actors}</p>
                      <p className='small'>Director: {media.director}</p>
                      <p className='small'>Genre: {media.genre}</p>
                      <p className='small'>Plot: {media.plot}</p>
                      <p className='small'>Rated: {media.rated}</p>
                      <p className='small'>Runtime: {media.runtime}</p>
                      <LikeButton mediaLikes={media.likes} 
                                  mediaType={media.mediaType}
                                  mediaId={media._id}
                                  cb={handleSaveLike}
                                  userData={userData}          
                      ></LikeButton>
                      <Button className='btn-block btn-danger' >
                        Comment
                      </Button>
                    </Card.Body>
                  </Card>)



              }

              if (media.mediaType === "game") {

                return (


                  <Card key={media._id} border='dark'>
                    
                    <Card.Body>
                    {media.picture ? <Card.Img  id="profile-pic" src={media.picture} alt={media.username} variant='top' /> : null}
                      <Card.Text>{media.username}</Card.Text>
                      <Card.Text>{moment(media.createdAt).calendar()}</Card.Text>
                      {media.image ? <Card.Img id="media-pic" src={media.image} alt={`The image for ${media.title}`} variant='top' /> : null}
                      <Card.Title>{media.title}</Card.Title>
                      <p className='small'>Developer: {media.developer}</p>
                      <Card.Text>{media.description}</Card.Text>
                   

                      <LikeButton mediaLikes={media.likes} 
                                  mediaType={media.mediaType}
                                  mediaId={media._id}
                                  cb={handleSaveLike}
                                  userData={userData}          
                      ></LikeButton>

                      <Button className='btn-block btn-danger' >
                        Comment
                      </Button>
                    </Card.Body>
                  </Card>)



              }

            }

            )


            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;





