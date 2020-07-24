import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';
import LikeButton from '../LikeButton';
import CommentComponent from '../../components/CommentComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faStar } from '@fortawesome/free-solid-svg-icons';
// import UserInfoContext from '../../utils/UserInfoContext'
import './style.css';


function FeedCard(props) {

  if (props.mediaType === 'book') {
    const media = props.media;
    return (
      <Card className='book-border' key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? 
            <Link to={`/friend_profile?id=${media.userId}`}>
            <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            </Link>
            : null}
          <Card.Title>
            <Link to={`/friend_profile?id=${media.userId}`}>{media.username}</Link> saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title><b>{media.title.toUpperCase()}</b>
              <p className='by'>{media.authors.length > 1 ? 'Authors' : 'Author'}: {media.authors}</p>
            </Card.Title>
          </div>
          <div id="center-wrap">
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
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
          <LikeButton mediaLikes={media.likes}
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
            page='home'
          />
          <CommentComponent
            comments={media.comments}
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
      <Card className='music-border' key={media._id} border='dark'>
        <Card.Body>
        {media.picture
            ? 
            <Link to={`/friend_profile?id=${media.userId}`}>
            <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            </Link>
            : null}
          <Card.Title>
            <Link to={`/friend_profile?id=${media.userId}`}>{media.username}</Link> saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={media.artist} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title><b>{media.title.toUpperCase()}</b>
              <p className='by'>Artist: {media.artist}</p>
            </Card.Title>
            <ReactAudioPlayer
              className='audio-player'
              src={media.preview}
              controls
            />
          </div>
          <div id="center-wrap">
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
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
            page='home'
          />
          <CommentComponent
            comments={media.comments}
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
      <Card className='movie-border' key={media._id} border='dark'>
        <Card.Body>
        {media.picture
            ? 
            <Link to={`/friend_profile?id=${media.userId}`}>
            <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            </Link>
            : null}
          <Card.Title>
            <Link to={`/friend_profile?id=${media.userId}`}>{media.username}</Link> saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id='center-wrap'>
            <br />
            <Card.Title><b>{media.title.toUpperCase()}</b>
              <p className='by'>Director: {media.director}</p>
            </Card.Title>
          </div>
          <div id="center-wrap">
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
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
            page='home'
          />
          <CommentComponent
            // cb={props.cb2}
            comments={media.comments}
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
      <Card className='game-border' key={media._id} border='dark'>
        <Card.Body>
        {media.picture
            ? 
            <Link to={`/friend_profile?id=${media.userId}`}>
            <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            </Link>
            : null}
          <Card.Title>
            <Link to={`/friend_profile?id=${media.userId}`}>{media.username}</Link> saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The image for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title><b>{media.title.toUpperCase()}</b>
              <p className='by'>Developer: {media.developer}</p>
            </Card.Title>
          </div>
          <div id="center-wrap">
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
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
            page='home'
          />
          <CommentComponent
            // cb={props.cb2}
            comments={media.comments}
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
    const mediatype = media.mediaType.toLowerCase();
    const border = `${mediatype}-border`;
    console.log('from FeedCard: ', media, props.userData)
    return (
      <Card className={border} key={media.mediaId} border='dark'>
        <Card.Body>
          <FontAwesomeIcon
            id='profile-pic'
            className={`${mediatype}-color star-icon`}
            icon={faStar}
          />
          <Card.Title id='fav-title'>
            {props.userData.username} favorited this {media.mediaType.toLowerCase()}!
            <p className='small'>Saved {moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {props.media.image
            ? <div id="center-wrap">
              <Card.Img id="media-pic" src={media.image} alt={`The image for ${media.title}`} variant='top' />
            </div>
            : null}
          <div id="center-wrap">
            <br />
            <Card.Title>
              <b>{media.title.toUpperCase()}</b>
              <p className='by'>{media.director}{media.authors}{media.artist}{media.developer}</p>
            </Card.Title>
            {media.preview
              ? <ReactAudioPlayer
                className='audio-player'
                src={media.preview}
                controls
              />
              : null
            }
          </div>
          <div id="center-wrap">
            <p className={`ratingReviewHeading ${border}`}>{props.userData.username}'s Rating</p>
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
            <p className={`ratingReviewHeading ${border}`}>{props.userData.username}'s Review</p>
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default FeedCard;