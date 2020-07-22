import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function MakeFavorite(props) {

  let icon = faStar;
  let type = props.media.mediaType.toLowerCase();

  return (
    <>
      {props.username && (
          <p className='fav-group'>
            <a onClick={() => props.makeFavorite(props.media)}>
              {props.media.userFavorite
                ? <FontAwesomeIcon
                  id='faved-icon'
                  className={`${type}-color`}
                  icon={icon}
                />
                :
                <FontAwesomeIcon
                  id='fave-icon'
                  icon={icon}
                />
              }
            </a>
            <span className='fav-label'>
              {
                props.media.userFavorite
                  ? 'Saved to Favorites'
                  : 'Add to Favorites'
              }
            </span>
          </p>
      )}
    </>
  )
}

export default MakeFavorite;