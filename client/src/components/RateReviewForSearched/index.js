import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import './style.css';

function RateReviewForSearched(props) {

    return (
        <>
            {console.log('props: ', props)}
            {props.username && (
                <>
                    {props.savedArray?.some((savedMedia) => savedMedia.movieId === props.media.movieId)
                        ?

                        <>

                            <h6>You have saved this {props.mediatype} to your media pages! You can see it now in its new home, MyMedia!</h6>
                            <Link to='saved_movies' >
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
                                            value={i} onClick={() => props.setUserRating(ratingValue)} />
                                        <FaVideo className='star' onMouseEnter={() => props.setHover(ratingValue)}
                                            onMouseLeave={() => props.setHover(null)} color={ratingValue <= (props.hover || props.userRating) ? 'black' : '#e4e5e9'} size={25} />
                                    </label>
                                )
                            })}
                            </p>

                            <p className='bold'>Your Review!</p>

                            <Form>
                                <Col>
                                    <Form.Control
                                        name={props.media.movieId}
                                        defaultValue=''
                                        onChange={(e) => props.setReviewInput(e.target.value)}
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
                                onClick={() => props.handleSaveMedia(props.media)}>
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
