import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import './style.css';

function RateSaved(props) {

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
        
        {props.selectedMovieRating._id && (
            <>
                {props.media._id === props.selectedMovieRating._id
                    ?
                    <Form onSubmit={props.handleRatingFormSubmit}>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={i}>
                                    <input type='radio' name='rating'
                                        value={i} onClick={() => props.setUserRating(ratingValue)} />
                                    <FaVideo key={ratingValue} className='star' onMouseEnter={() => props.setHover(ratingValue)}
                                        onMouseLeave={() => props.setHover(null)} color={ratingValue <= (props.hover || props.userRating) ? 'black' : '#e4e5e9'} size={25} />
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
