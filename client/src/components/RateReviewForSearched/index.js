import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function RateReviewForSearched(props) {

  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewInput, setReviewInput] = useState('');

  const [faIcon, setFaIcon] = useState('');

  useEffect(() => {

    let icon;

    switch (props.mediaTypeSg) {
      case 'Book':
        icon = faBookOpen;
        setFaIcon(icon);
        console.log(icon);
        break;
      case 'Music':
        icon = faMusic;
        setFaIcon(icon);
        console.log(icon);
        break;
      case 'Game':
        icon = faGamepad;
        setFaIcon(icon);
        console.log(icon);
        break;
      default:
        icon = faVideo;
        setFaIcon(icon);
        console.log(icon);
    }

  }, []);

  return (
    <>
      {console.log('props: ', props)}
      {props.username && (
        <>
          {props.savedArray?.some((savedMedia) => savedMedia.mediaId === props.media.mediaId)
            ?
            <>
              {console.log('savedArray: ', props.savedArray, 'media: ', props.media.mediaId)}
              <div className='center-wrap'>
                <p className='already-saved'>This {props.mediatype} has already been saved!</p>
                <Link to={props.link}>
                  <Button className={`btn-block save-media-btn ${props.mediatype}-color ${props.mediatype}-border ${props.mediatype}-hover-fill`} onClick={() => console.log((props.media))}  >
                    Go to My {props.mediaType}
                  </Button>
                </Link>
              </div>
            </>
            :
            <>
              {console.log('savedArray: ', props.savedArray, 'media: ', props.media.mediaId)}
              <div className='center-wrap'>
                <p className={`ratingReviewHeading ${props.mediatype}-border`}>Rate</p>
                <p className='rating'>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={i}>
                        <input type='radio' name={props.media.mediaId}
                          value={i} onClick={() => setUserRating(ratingValue)} />
                        <FontAwesomeIcon key={ratingValue} icon={faIcon} className='star' onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)} color={ratingValue <= (hover || userRating) ? 'black' : '#e4e5e9'} size={'lg'} />
                      </label>
                    )
                  })}
                </p>
                <p className={`ratingReviewHeading ${props.mediatype}-border`}>Review</p>
              </div>
              <Form>
                <Form.Control
                  className='review-input'
                  name={props.media.mediaId}
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  type='text'
                  size='md'
                  as='textarea'
                  rows='6'
                  placeholder='enter your review here'
                />
              </Form>
              <Button
                className={`btn-block save-media-btn ${props.mediatype}-color ${props.mediatype}-border ${props.mediatype}-hover-fill`}
                onClick={() => props.cb(props.media, userRating, reviewInput)}>
                Save this {props.mediaTypeSg}
              </Button>
            </>
          }
        </>
      )}
    </>
  )
}

export default RateReviewForSearched;
