import React from 'react';
import { Card } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';
import LikeButton from '../LikeButton';
import CommentComponent from '../../components/CommentComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons';
// import UserInfoContext from '../../utils/UserInfoContext'
import './style.css';


function FeedCard(props) {
  if (props.mediaType === 'book') {
    const media = props.media;
    return (
      <Card key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
            <br />
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title>{media.title}
              <p className='small'>{media.authors.length > 1 ? 'Authors' : 'Author'}: {media.authors}</p>
            </Card.Title>
          </div>
          <div className='center-wrap'>
            <p className='ratingReviewHeading'>{media.username}'s' Rating</p>
            <p className='rating'>
              {[...Array(media.userRating)].map((star, i) => {
                return (
                  <label key={i}>
                    <FontAwesomeIcon className='read-only-star' icon={faBookOpen} color='black' size={'lg'} />
                  </label>
                )
              })}
            </p>
            <p className='ratingReviewHeading'>{media.username}'s Review</p>
            <p>{media.userReview.length ? media.userReview : "What's good...and what's not? Write a review!"}</p>
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
          />
          <CommentComponent
            mediaId={media._id}
            mediaType={media.mediaType}
            title={media.title}
            ownerId={media.userId}
            commenterUsername={props.userData.username}
            mediaComments={media.comments} />
        </Card.Body>
      </Card>
    )
  } else if (props.mediaType === 'music') {
    const media = props.media;
    return (
      <Card key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
            <br />
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={media.artist} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title>{media.title}
              <p className='small'>Artist: {media.artist}</p>
            </Card.Title>
            <div className='center-wrap'>
            <p className='ratingReviewHeading'>{media.username}'s' Rating</p>
            <p className='rating'>
              {[...Array(media.userRating)].map((star, i) => {
                return (
                  <label key={i}>
                    <FontAwesomeIcon className='read-only-star' icon={faMusic} color='black' size={'lg'} />
                  </label>
                )
              })}
            </p>
            <p className='ratingReviewHeading'>{media.username}'s Review</p>
            <p>{media.userReview.length ? media.userReview : "What's good...and what's not? Write a review!"}</p>
          </div>
            <ReactAudioPlayer
              id="music-player"
              src={media.preview}
              controls
            />
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
          />
          <CommentComponent
            mediaId={media._id}
            mediaType={media.mediaType}
            title={media.title}
            ownerId={media.userId}
            commenterUsername={props.userData.username}
            mediaComments={media.comments} />
        </Card.Body>
      </Card>
    );
  } else if (props.mediaType === 'movie') {
    const media = props.media;
    return (
      <Card key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
            <br />
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id='center-wrap'>
            <br />
            <Card.Title>{media.title}
              <p className='small'>Director: {media.director}</p>
            </Card.Title>
          </div>
          <div className='center-wrap'>
            <p className='ratingReviewHeading'>{media.username}'s' Rating</p>
            <p className='rating'>
              {[...Array(media.userRating)].map((star, i) => {
                return (
                  <label key={i}>
                    <FontAwesomeIcon className='read-only-star' icon={faVideo} color='black' size={'lg'} />
                  </label>
                )
              })}
            </p>
            <p className='ratingReviewHeading'>{media.username}'s Review</p>
            <p>{media.userReview.length ? media.userReview : "What's good...and what's not? Write a review!"}</p>
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
          />
          <CommentComponent
            mediaId={media._id}
            mediaType={media.mediaType}
            title={media.title}
            ownerId={media.userId}
            commenterUsername={props.userData.username}
            mediaComments={media.comments} />
        </Card.Body>
      </Card>
    );
  } else if (props.mediaType === 'game') {
    const media = props.media;
    return (
      <Card key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
            <br />
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The image for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title>{media.title}
              <p className='small'>Developer: {media.developer}</p>
            </Card.Title>
          </div>
          <div className='center-wrap'>
            <p className='ratingReviewHeading'>{media.username}'s' Rating</p>
            <p className='rating'>
              {[...Array(media.userRating)].map((star, i) => {
                return (
                  <label key={i}>
                    <FontAwesomeIcon className='read-only-star' icon={faGamepad} color='black' size={'lg'} />
                  </label>
                )
              })}
            </p>
            <p className='ratingReviewHeading'>{media.username}'s Review</p>
            <p>{media.userReview.length ? media.userReview : "What's good...and what's not? Write a review!"}</p>
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
          />
          <CommentComponent
            mediaId={media._id}
            mediaType={media.mediaType}
            title={media.title}
            ownerId={media.userId}
            commenterUsername={props.userData.username}
            mediaComments={media.comments} />
        </Card.Body>
      </Card>
    );
  } else {
    const media = props.media;
    console.log('from FeedCard: ', media, props.userData)
    return (
      <Card key={props.media.mediaId} border='dark'>
        <Card.Body>
          {props.userData.picture
            ? <Card.Img id="profile-pic" src={props.userData.picture} alt={props.userData.username} variant='top' />
            : null}
          <Card.Title>{props.userData.username} saved this {props.mediaType}
            <p className='small'>{moment(props.media.createdAt).calendar()}</p>
            <br />
          </Card.Title>
          {props.media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={props.media.image} alt={`The image for ${props.media.title}`} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title>
              {props.media.title}
            </Card.Title>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default FeedCard;