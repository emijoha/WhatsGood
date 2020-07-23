import React from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';
import LikeButton from '../LikeButton';
import CommentComponent from '../../components/CommentComponent'
import RateSaved from '../RateSaved';
import ReviewSaved from '../ReviewSaved';
import MakeFavorite from '../MakeFavorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons';
import './style.css';


function FriendProfileFeedCard(props) {
  if (props.media.mediaType === 'Book') {
    const media = props.media;
    console.log(media.authors)
    return (
      <Card className='book-border' key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title>{media.title.toUpperCase()}
              <p className='by'>{media.authors.length > 1 ? 'Authors' : 'Author'}: {media.authors}</p>
            </Card.Title>
          </div>
          <div className='center-wrap'>
            <p className='ratingReviewHeading book-border'>{media.username}'s Rating</p>
            <p className='rating'>
              {
                (media.userRating === 0)
                  ? <p>No rating yet.</p>
                  : null
              }
              {[...Array(media.userRating)].map((star, i) => {
                return (
                  <label key={i}>
                    <FontAwesomeIcon className='read-only-star' icon={faBookOpen} color='black' size={'lg'} />
                  </label>
                )
              })}
            </p>
            <p className='ratingReviewHeading book-border'>{media.username}'s Review</p>
            <p>{media.userReview.length ? media.userReview : null}</p>
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={props.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
          />
          <CommentComponent
            comments={media.comments}
            mediaId={media._id}
            mediaType={props.mediaType}
            title={media.title}
            ownerId={media.userId}
            commenterUsername={props.userData.username}
            mediaComments={media.comments}
          />
        </Card.Body>
      </Card>
    )
  } else if (props.media.mediaType === 'Music') {
    const media = props.media;
    return (
      <Card className='music-border' key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={media.artist} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title>{media.title.toUpperCase()}
              <p className='by'>Artist: {media.artist}</p>
            </Card.Title>
            <ReactAudioPlayer
              id="music-player"
              src={media.preview}
              controls
            />
          </div>
          <div className='center-wrap'>
            <p className='ratingReviewHeading music-border'>{media.username}'s Rating</p>
            <p className='rating'>
              {
                (media.userRating === 0)
                  ? <p>No rating yet.</p>
                  : null
              }
              {[...Array(media.userRating)].map((star, i) => {
                return (
                  <label key={i}>
                    <FontAwesomeIcon className='read-only-star' icon={faMusic} color='black' size={'lg'} />
                  </label>
                )
              })}
            </p>
            <p className='ratingReviewHeading music-border'>{media.username}'s Review</p>
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={props.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
          />
          <CommentComponent
            comments={media.comments}
            mediaId={media._id}
            mediaType={props.mediaType}
            title={media.title}
            ownerId={media.userId}
            commenterUsername={props.userData.username}
            mediaComments={media.comments} />
        </Card.Body>
      </Card>
    );
  } else if (props.media.mediaType === 'Movie') {
    const media = props.media;
    return (
      <Card className='movie-border' key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id='center-wrap'>
            <br />
            <Card.Title>{media.title.toUpperCase()}
              <p className='by'>Director: {media.director}</p>
            </Card.Title>
          </div>
          <div className='center-wrap'>
            <p className='ratingReviewHeading movie-border'>{media.username}'s Rating</p>
            <p className='rating'>
              {
                (media.userRating === 0)
                  ? <p>No rating yet.</p>
                  : null
              }
              {[...Array(media.userRating)].map((star, i) => {
                return (
                  <label key={i}>
                    <FontAwesomeIcon className='read-only-star' icon={faVideo} color='black' size={'lg'} />
                  </label>
                )
              })}
            </p>
            <p className='ratingReviewHeading movie-border'>{media.username}'s Review</p>
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={props.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
          />
          <CommentComponent
            comments={media.comments}
            mediaId={media._id}
            mediaType={props.mediaType}
            title={media.title}
            ownerId={media.userId}
            commenterUsername={props.userData.username}
            mediaComments={media.comments} />
        </Card.Body>
      </Card>
    );
  } else if (props.media.mediaType === 'Game') {
    const media = props.media;
    return (
      <Card className='game-border' key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The image for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title>{media.title.toUpperCase()}
              <p className='by'>Developer: {media.developer}</p>
            </Card.Title>
          </div>
          <div className='center-wrap'>
            <p className='ratingReviewHeading game-border'>{media.username}'s Rating</p>
            <p className='rating'>
              {
                (media.userRating === 0)
                  ? <p>No rating yet.</p>
                  : null
              }
              {[...Array(media.userRating)].map((star, i) => {
                return (
                  <label key={i}>
                    <FontAwesomeIcon className='read-only-star' icon={faGamepad} color='black' size={'lg'} />
                  </label>
                )
              })}
            </p>
            <p className='ratingReviewHeading game-border'>{media.username}'s Review</p>
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={props.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
          />
          <CommentComponent
            comments={media.comments}
            mediaId={media._id}
            mediaType={props.mediaType}
            title={media.title}
            ownerId={media.userId}
            commenterUsername={props.userData.username}
            mediaComments={media.comments} />
          <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMedia(media._id, media.mediaType)}>
            Delete this Game!
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default FriendProfileFeedCard;