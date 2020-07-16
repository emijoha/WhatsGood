import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import './style.css';

function ReviewSaved(props) {

    return (
        <>
            {props.username && (
                <>
                    {(props.media.movieReview === '') ?
                        <Button className='btn-block btn-success' onClick={() => props.startReview(props.media)}  >
                            Review this {props.mediaType}!
                        </Button>

                        :

                        <Button className='btn-block btn-success' onClick={() => props.startReview(props.media)}  >
                            Update your Review?
                        </Button>
                    }
                </>
            )}

            {props.selectedMovieReview._id && (
                <>
                    {props.media._id === props.selectedMovieReview._id
                        ?
                        <Form onSubmit={props.handleReviewFormSubmit}>
                            <Col>
                                <Form.Control
                                    name='reviewInput'
                                    value={props.reviewInput}
                                    onChange={(e) => props.setReviewInput(e.target.value)}
                                    type='text'
                                    size='md'
                                    as='textarea'
                                    rows='6'
                                    placeholder='Review this movie'
                                />
                            </Col>
                            <Col>
                                <Button type='submit' variant='success' size='md'>
                                    Submit Review
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

export default ReviewSaved;