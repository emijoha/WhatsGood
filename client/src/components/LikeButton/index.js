import React, { useState, useEffect } from 'react';
import { Card, Button, Text } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import "./style.css";


const LikeButton = ({ mediaLikes, mediaType, ownerId, mediaId, userData, title, cb, page }) => {

  const [internalCount, setInternalCount] = useState(0);

  let likeIcon = faThumbsUp;

  useEffect(() => {
    setInternalCount(mediaLikes);
  }, [mediaLikes])

  const handleSave = () => {
    setInternalCount(internalCount + 1);
    cb(mediaType, mediaId, mediaLikes, ownerId, title);
  }

  if (page === 'profile') {
    return (
      <div>
        <Card.Text>
          <p className='like-group'>
            <span className='like-label'>
              Likes: {internalCount}
            </span>
            <a>
              <FontAwesomeIcon
                id='liked-icon'
                className={`${mediaType.toLowerCase()}-color`}
                icon={likeIcon}
              />
            </a>
          </p>
        </Card.Text>
      </div>
    );
  } else {
    return (
      <div>
        <Card.Text>
          <p className='like-group'>
            <span className='like-label'>
              Likes: {internalCount}
            </span>
            {userData.savedLikes?.some((savedLike) => savedLike.mediaId === mediaId)
              ? <a>
                <FontAwesomeIcon
                  id='liked-icon'
                  className={`${mediaType.toLowerCase()}-color`}
                  icon={likeIcon}
                />
              </a>
              : <a onClick={() => handleSave()}>
                <FontAwesomeIcon
                  id='like-icon'
                  icon={likeIcon}
                />
              </a>
            }
          </p>
        </Card.Text>
      </div>
    );
  }
}

export default LikeButton;