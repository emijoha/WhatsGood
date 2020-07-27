import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import "./style.css";


// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';
import AuthService from '../../utils/auth';
import * as API from '../../utils/API';

import FeedCard from '../../components/FeedCard';
import SideBar from '../../components/SideBar';
import SubNavbar from '../../components/SubNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faAsterisk, faSearch } from '@fortawesome/free-solid-svg-icons';

function Home() {

  const [allFriendsMediaState, setAllFriendsMediaState] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [friendPicArray, setFriendPicArray] = useState([]);

  function compareTimeStamp(a, b) {
    return b.timeStamp - a.timeStamp;
  }

  const userData = useContext(UserInfoContext);
  console.log("userDATA:  ", userData);
  const likerUsername = userData.username;

  useEffect(() => {
    renderAllMedia();
  }, [userData.username]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  
function renderAllMedia() {
    setLoadingState(true);

    if (userData.friends.length === 0) {
      setLoadingState(false)
    }


let friendsIdArray = []
userData.friends.map(friend =>{

  friendsIdArray.push(friend.id)

  const friendData = {
    _id: friend._id,
    picture: friend.picture
  }

  setFriendPicArray(friendPicArray => [...friendPicArray, friendData])
})

const request = {
  friendsArray: friendsIdArray
};



API.getMedia(JSON.stringify(request))
.then(result => {

  result.data.map(media => {
    setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, media].sort(compareTimeStamp));
  })

  setLoadingState(false);
  
  })

}

const handleRenderMediaPage = useCallback((mediaType) => {

    setAllFriendsMediaState([]);

    setLoadingState(true)

    if (mediaType === "all") {
      renderAllMedia();
    }
    if (mediaType === "music") {


      setLoadingState(true);

      if (userData.friends.length === 0) {
        setLoadingState(false)
      }
  
  
  let friendsIdArray = []
  userData.friends.map(friend =>{
  
    friendsIdArray.push(friend.id)
  
    const friendData = {
      _id: friend._id,
      picture: friend.picture
    }
  
    setFriendPicArray(friendPicArray => [...friendPicArray, friendData])
  })
  
  const request = {
    friendsArray: friendsIdArray
  };
  
  
  
  API.getMedia(JSON.stringify(request))
  .then(result => {
  
    result.data.map(media => {

      if (media.mediaType === "music")
      setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, media].sort(compareTimeStamp));
    })
  
    setLoadingState(false);
    
    })

    }

    if (mediaType === "game") {

 
      setLoadingState(true);

      if (userData.friends.length === 0) {
        setLoadingState(false)
      }
  
  
  let friendsIdArray = []
  userData.friends.map(friend =>{
  
    friendsIdArray.push(friend.id)
  
    const friendData = {
      _id: friend._id,
      picture: friend.picture
    }
  
    setFriendPicArray(friendPicArray => [...friendPicArray, friendData])
  })
  
  const request = {
    friendsArray: friendsIdArray
  };
  
  
  
  API.getMedia(JSON.stringify(request))
  .then(result => {
  
    result.data.map(media => {

      if (media.mediaType === "game")
      setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, media].sort(compareTimeStamp));
    })
  
    setLoadingState(false);
    
    })
    }

    if (mediaType === "movie") {

    
      setLoadingState(true);

      if (userData.friends.length === 0) {
        setLoadingState(false)
      }
  
  
  let friendsIdArray = []
  userData.friends.map(friend =>{
  
    friendsIdArray.push(friend.id)
  
    const friendData = {
      _id: friend._id,
      picture: friend.picture
    }
  
    setFriendPicArray(friendPicArray => [...friendPicArray, friendData])
  })
  
  const request = {
    friendsArray: friendsIdArray
  };
  
  
  
  API.getMedia(JSON.stringify(request))
  .then(result => {
  
    result.data.map(media => {

      if (media.mediaType === "movie")
      setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, media].sort(compareTimeStamp));
    })
  
    setLoadingState(false);
    
    })
    }

    if (mediaType === "book") {

      setLoadingState(true);

      if (userData.friends.length === 0) {
        setLoadingState(false)
      }
  
  
  let friendsIdArray = []
  userData.friends.map(friend =>{
  
    friendsIdArray.push(friend.id)
  
    const friendData = {
      _id: friend._id,
      picture: friend.picture
    }
  
    setFriendPicArray(friendPicArray => [...friendPicArray, friendData])
  })
  
  const request = {
    friendsArray: friendsIdArray
  };
  
  
  
  API.getMedia(JSON.stringify(request))
  .then(result => {
  
    result.data.map(media => {

      if (media.mediaType === "book")
      setAllFriendsMediaState(allFriendsMediaState => [...allFriendsMediaState, media].sort(compareTimeStamp));
    })
  
    setLoadingState(false);
    
    })
    }

  })

  const handleSaveLike = useCallback((likeMediaType, like_id, mediaLikes, ownerId, title) => {
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

    // info for notification
    const notificationData = {
      likerUsername: likerUsername,
      title: title,
      ownerId: ownerId,
      type: "like",
      mediaId: like_id,
      mediaType: likeMediaType
    }

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

    //call to send notification to user  
    API.addNotification(notificationData, token)
      .then(() => {
        console.log("NOTIFICATION ADDED");
        userData.getUserData();
      })
      .catch(err => console.log(err));
  });

  return (
    <>
    
      <Row>
        <Col>
          <SubNavbar xs={12} s={12} md={12} lg={0} cb={handleRenderMediaPage} username={userData.username} />
        </Col>
      </Row>
      <Container width="100%">
        <Row id="main-body-row">
          <Col id="side-bar-column" className="text-right" xs={0} s={0} md={1} lg={3}>
            <SideBar
              cb={handleRenderMediaPage}
              username={userData.username}
            />
          </Col>
          <Col id="media-feed-column" xs={12} s={12} md={10} lg={6} >

            {/* <button onClick={() => getMediaFromApi()}></button> */}

            {console.log("allfriendsmediaState in the return", allFriendsMediaState)}
            {loadingState ?

              <div className="text-center">
                <Spinner animation="border" />
              </div>

              :

              <div>
                {allFriendsMediaState.length === 0

                  ?
                  <div className='text-center empty-content' id='neon-hover'>
                    <a className="muted-subtext2" id='neon-hover' href='/search_user'>
                      Find and add friends to see
                      <FontAwesomeIcon
                        className='search-icon-media'
                        icon={faSearch}
                      />
                    <p className='muted-logo special-font'>WHAT'S GOOD</p>
                    </a>

                  </div>
                  :
                  <div>
                    {allFriendsMediaState.map(media => {

                    const found = friendPicArray.find(element => element._id === media.userId)


                      if (media.mediaType === "book") {
                        return (
                          <FeedCard
                            picture={found.picture}
                            key={media._id}
                            mediaType='book'
                            media={media}
                            cb={handleSaveLike}
                            userData={userData}
                          />
                        );
                      }
                      if (media.mediaType === "music") {
                        return (
                          <FeedCard
                            picture={found.picture}
                            key={media._id}
                            mediaType='music'
                            media={media}
                            cb={handleSaveLike}
                            userData={userData}
                          />
                        );
                      }
                      if (media.mediaType === "movie") {
                        return (
                          <FeedCard
                            picture={found.picture}
                            key={media._id}
                            mediaType='movie'
                            media={media}
                            cb={handleSaveLike}
                            userData={userData}
                          />
                        );
                      }
                      if (media.mediaType === "game") {
                        return (
                          <FeedCard
                            picture={found.picture}
                            key={media._id}
                            mediaType='game'
                            media={media}
                            cb={handleSaveLike}
                            userData={userData}
                          />
                        );
                      }


                    })


                    }
                  </div>
                }
              </div>}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;





