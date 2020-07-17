import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Button } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import './style.css';

function RateReviewForSearched(props) {

    const [userRating, setUserRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [reviewInput, setReviewInput] = useState('');
  

    return (
        <>
            {console.log('props: ', props)}
            {props.username && (
                <>
                    {props.savedArray?.some((savedMedia) => savedMedia.movieId === props.media.movieId)
                        ?

                        <>

                            <h6>You have saved this {props.mediatype} to your media pages! You can see it now in its new home, MyMedia!</h6>
                            <Link to='/saved_movies'>
                                <Button className='btn-block btn-success' onClick={() => console.log(( props.media ))}  >
                                    Go to My Movies
                                </Button>
                            </Link>

                        </>

                        :
                        <>

                            <p className='bold'>Your Rating!
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <label key={i}>
                                        <input type='radio' name={props.media.movieId}
                                            value={i} onClick={() => setUserRating(ratingValue)} />
                                        <FaVideo className='star' onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)} color={ratingValue <= (hover || userRating) ? 'black' : '#e4e5e9'} size={25} />
                                    </label>
                                )
                            })}
                            </p>

                            <p className='bold'>Your Review!</p>

                            <Form>
                                <Col>
                                    <Form.Control
                                        name={props.media.movieId}
                                        value={reviewInput}
                                        onChange={(e) => setReviewInput(e.target.value)}
                                        type='text'
                                        size='md'
                                        as='textarea'
                                        rows='6'
                                        placeholder='enter your review here'
                                    />
                                </Col>
                            </Form>
                            <Button
                                className='btn-block btn-info'
                                onClick={() => props.cb(props.media, userRating, reviewInput)}>
                                Save this Movie
                            </Button>
                        </>
                    }
                </>
            )}

        </>
    )
}

export default RateReviewForSearched;
