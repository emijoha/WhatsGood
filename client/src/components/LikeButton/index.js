import React, { useState, useEffect } from 'react';
import { Card, Button, Text } from 'react-bootstrap';
import "./style.css";


const LikeButton = ({ mediaLikes, mediaType, ownerId, mediaId, userData, title, cb }) => {

  const [internalCount, setInternalCount] = useState(0);

  useEffect(() => {
    setInternalCount(mediaLikes);
  }, [mediaLikes])

  const handleSave = () => {
    setInternalCount(internalCount + 1);
    cb(mediaType, mediaId, mediaLikes, ownerId, title);
  }
  return (

    <div>
      <Card.Text>Likes: {internalCount}</Card.Text>
      <Button id="like-button" className='btn-block btn-primary' disabled={userData.savedLikes?.some((savedLike) => savedLike.mediaId === mediaId)}
        onClick={() => handleSave()}>
        {userData.savedLikes?.some((savedLike) => savedLike.mediaId === mediaId)
          ? 'Liked!'
          : 'Like'}
      </Button>
    </div>

  )

}

export default LikeButton;