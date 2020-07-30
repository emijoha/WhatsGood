import React, { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons';
import './style.css';


function RateSaved(props) {
  
  const [faIcon, setFaIcon] = useState('');
  const [rateColor, setRateColor] = useState('');

  useEffect(() => {

    let icon;

    switch (props.media.mediaType) {
      case 'book':
        icon = faBookOpen;
        setFaIcon(icon);
        setRateColor('rgb(43, 146, 230)');
        break;
      case 'music':
        icon = faMusic;
        setFaIcon(icon);
        setRateColor('rgb(255, 123, 123)');
        break;
      case 'game':
        icon = faGamepad;
        setFaIcon(icon);
        setRateColor('rgb(98, 236, 116)');
        break;
      default:
        icon = faVideo;
        setRateColor('rgb(196, 67, 255) ');
        setFaIcon(icon);
    }
  }, []);



  return (
    <>
      {props.username && (
        <>
          {(props.media.userRating === 0) ?
            <a className='btn-block text-center' id='rate-btn' onClick={() => props.startRating(props.media)}  >
              Rate this {props.mediaType}!
            </a>
            :
            <a className='btn-block text-center' id='rate-btn' onClick={() => props.startRating(props.media)}  >
              Update your Rating?
            </a>
          }
        </>
      )}
      {props.selectedMediaRating._id && (
        <>
          {props.media._id === props.selectedMediaRating._id
            ?
            <div className='center-wrap-rate'>
              <Form onSubmit={props.handleRatingFormSubmit}>
                <div className='rating-select'>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={i}>
                        <input id='rate-it' type='radio' name='rating'
                          value={i} onClick={() => props.setUserRating(ratingValue)} />
                        <FontAwesomeIcon
                          key={ratingValue}
                          icon={faIcon}
                          className='star'
                          onMouseEnter={() => props.setHover(ratingValue)}
                          onMouseLeave={() => props.setHover(null)}
                          color=
                          {ratingValue <= (props.hover || props.userRating)
                            ? rateColor
                            : 'gray'}
                          size={'lg'} />
                      </label>
                    )
                  })}
                </div>
                <Button id='rating-submit-btn' type='submit' size='md'>
                  SUBMIT
                </Button>
              </Form>
            </div>
            : null
          }
        </>
      )}
    </>
  )
}

export default RateSaved;
