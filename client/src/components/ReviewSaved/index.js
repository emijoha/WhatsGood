import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import './style.css';

function ReviewSaved(props) {

  return (
    <>
      {props.username && (
        <>
          {(props.media.userReview === '') ?
            <a className='btn-block text-center' id='review-btn' onClick={() => props.startReview(props.media)}  >
              Review this {props.mediaType}!
            </a>
            :
            <a className='btn-block text-center' id='review-btn' onClick={() => props.startReview(props.media)}  >
              Update your Review?
            </a>
          }
        </>
      )}
      {props.selectedMediaReview._id && (
        <>
          {props.media._id === props.selectedMediaReview._id
            ?
            <div className='center-wrap-review'>
              <Form onSubmit={props.handleReviewFormSubmit}>
                <Form.Control
                  className='review-text'
                  name='reviewInput'
                  value={props.reviewInput}
                  onChange={(e) => props.setReviewInput(e.target.value)}
                  type='text'
                  size='md'
                  as='textarea'
                  rows='6'
                  placeholder='Write a review'
                />
                <Button id='review-submit-btn' type='submit' size='md'>
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

export default ReviewSaved;