import React, { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons';
import './style.css';


function RateSaved(props) {

  const [faIcon, setFaIcon] = useState('');

  useEffect(() => {

    let icon;

    console.log('RateSaved props: ', props);

    switch (props.media.mediaType) {
      case 'Book':
        icon = faBookOpen;
        setFaIcon(icon);
        break;
      case 'Music':
        icon = faMusic;
        setFaIcon(icon);
        break;
      case 'Game':
        icon = faGamepad;
        setFaIcon(icon);
        break;
      default:
        icon = faVideo;
        setFaIcon(icon);
    }

  }, []);

  return (
    <>
      {props.username && (
        <>
          {(props.media.userRating === 0) ?
            <Button className='btn-block btn-success' onClick={() => props.startRating(props.media)}  >
              Rate this {props.mediaType}!
            </Button>

            :

            <Button className='btn-block btn-success' onClick={() => props.startRating(props.media)}  >
              Update your Rating?
            </Button>
          }
        </>
      )}

      {props.selectedMediaRating._id && (
        <>
          {props.media._id === props.selectedMediaRating._id
            ?
            <Form onSubmit={props.handleRatingFormSubmit}>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input type='radio' name='rating'
                      value={i} onClick={() => props.setUserRating(ratingValue)} />
                    <FontAwesomeIcon key={ratingValue} icon={faIcon} className='star' onMouseEnter={() => props.setHover(ratingValue)}
                      onMouseLeave={() => props.setHover(null)} color={ratingValue <= (props.hover || props.userRating) ? 'black' : '#e4e5e9'} size={'lg'} />
                  </label>
                )
              })}

              <Col>
                <Button type='submit' variant='success' size='md'>
                  Submit Rating
                </Button>
              </Col>
            </Form>
            : null
          }
        </>

      )}
    </>
  )
}

export default RateSaved;
