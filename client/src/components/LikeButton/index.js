import React, { useState, useEffect } from 'react';
import { Card, Button, Text } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import "./style.css";


const LikeButton = ({ mediaLikes, mediaType, ownerId, mediaId, userData, title, cb }) => {

  const [internalCount, setInternalCount] = useState(0);

  let likeIcon = faThumbsUp;

  useEffect(() => {
    setInternalCount(mediaLikes);
  }, [mediaLikes])

  const handleSave = () => {
    setInternalCount(internalCount + 1);
    cb(mediaType, mediaId, mediaLikes, ownerId, title);
  }

  return (

    <div>
      <Card.Text>

        <p className='like-group'>
          <span className='like-label'>
            Likes: {internalCount}
          </span>
          <a
            onClick={() => handleSave()}
            disabled={userData.savedLikes?.some((savedLike) => savedLike.mediaId === mediaId)}
          >
            {userData.savedLikes?.some((savedLike) => savedLike.mediaId === mediaId)
              ? <FontAwesomeIcon
                id='liked-icon'
                icon={likeIcon}
              />
              : <FontAwesomeIcon
                id='like-icon'
                icon={likeIcon}
              />
            }
          </a>
        </p>

      </Card.Text>
      {/* <Button id="like-button" className='btn-block btn-primary' disabled={userData.savedLikes?.some((savedLike) => savedLike.mediaId === mediaId)}
        onClick={() => handleSave()}>
        {userData.savedLikes?.some((savedLike) => savedLike.mediaId === mediaId)
          ? 'Liked!'
          : 'Like'}
      </Button> */}
    </div>

  )

}

export default LikeButton;