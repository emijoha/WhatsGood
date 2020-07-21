import React from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';
import LikeButton from '../LikeButton';
import CommentComponent from '../CommentComponent'
import RateSaved from '../RateSaved';
import ReviewSaved from '../ReviewSaved';
import MakeFavorite from '../MakeFavorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons';
import './style.css';


function ProfileFeedCard(props) {
  function randomNum() {
    return Math.floor(Math.random() * 4) + 1;
  }

  if (props.media.mediaType === 'Book') {
    const media = props.media;
    return (
      <Card className={`book-border${randomNum()}`} key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {/* <MakeFavorite
            username={media.username}
            media={media}
            makeFavorite={props.makeFavorite}
          /> */}
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
          <div id="center-wrap-tall">
            <p className='ratingReviewHeading'>{media.username}'s Rating</p>
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
            <p className='ratingReviewHeading'>{media.username}'s Review</p>
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
          {/* <RateSaved
            username={media.username}
            // mediaType={'Book'}
            media={media}
            startRating={props.startRating}
            selectedMediaRating={props.selectedMediaRating}
            handleRatingFormSubmit={props.handleRatingFormSubmit}
            setUserRating={props.setUserRating}
            userRating={props.userRating}
            setHover={props.setHover}
            hover={props.hover}
          />
          <ReviewSaved
            username={media.username}
            // mediaType={'Book'}
            media={media}
            startReview={props.startReview}
            selectedMediaReview={props.selectedMediaReview}
            handleReviewFormSubmit={props.handleReviewFormSubmit}
            setReviewInput={props.setReviewInput}
          /> */}
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
          {/* <Button className='btn-block btn-danger' onClick={() => props.handleDeleteBook(media._id)}>
            Delete this Book!
          </Button> */}
        </Card.Body>
      </Card>
    )
  } else if (props.media.mediaType === 'Music') {
    const media = props.media;
    return (
      <Card className={`music-border${randomNum()}`} key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {/* <MakeFavorite
            username={media.username}
            media={media}
            makeFavorite={props.makeFavorite}
          /> */}
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
          </div>
          <ReactAudioPlayer
            id="music-player"
            src={media.preview}
            controls
          />
          <div id="center-wrap-tall">
            <p className='ratingReviewHeading'>{media.username}'s Rating</p>
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
            <p className='ratingReviewHeading'>{media.username}'s Review</p>
          </div>
          <div className='scroll-box'>
            <p>{media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}</p>
          </div>
          {/* <RateSaved
            username={media.username}
            // mediaType={'Book'}
            media={media}
            startRating={props.startRating}
            selectedMediaRating={props.selectedMediaRating}
            handleRatingFormSubmit={props.handleRatingFormSubmit}
            setUserRating={props.setUserRating}
            userRating={props.userRating}
            setHover={props.setHover}
            hover={props.hover}
          />
          <ReviewSaved
            username={media.username}
            // mediaType={'Book'}
            media={media}
            startReview={props.startReview}
            selectedMediaReview={props.selectedMediaReview}
            handleReviewFormSubmit={props.handleReviewFormSubmit}
            setReviewInput={props.setReviewInput}
          /> */}
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
          {/* <Button className='btn-block' onClick={() => props.handleDeleteMusic(media._id)}>
            Delete this Music!
          </Button> */}
        </Card.Body>
      </Card>
    );
  } else if (props.media.mediaType === 'Movie') {
    const media = props.media;
    return (
      <Card className={`movie-border${randomNum()}`} key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {/* <MakeFavorite
            username={media.username}
            media={media}
            makeFavorite={props.makeFavorite}
          /> */}
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
          <div id="center-wrap-tall">
            <p className='ratingReviewHeading'>{media.username}'s Rating</p>
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
            <p className='ratingReviewHeading'>{media.username}'s Review</p>
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
          {/* <RateSaved
            username={media.username}
            // mediaType={'Book'}
            media={media}
            startRating={props.startRating}
            selectedMediaRating={props.selectedMediaRating}
            handleRatingFormSubmit={props.handleRatingFormSubmit}
            setUserRating={props.setUserRating}
            userRating={props.userRating}
            setHover={props.setHover}
            hover={props.hover}
          />
          <ReviewSaved
            username={media.username}
            // mediaType={'Book'}
            media={media}
            startReview={props.startReview}
            selectedMediaReview={props.selectedMediaReview}
            handleReviewFormSubmit={props.handleReviewFormSubmit}
            setReviewInput={props.setReviewInput}
          /> */}
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
          <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMovie(media._id)}>
            Delete this Movie!
          </Button>
        </Card.Body>
      </Card>
    );
  } else if (props.media.mediaType === 'Game') {
    const media = props.media;
    return (
      <Card className={`game-border${randomNum()}`} key={media._id} border='dark'>
        <Card.Body>
          {media.picture
            ? <Card.Img id="profile-pic" src={media.picture} alt={media.username} variant='top' />
            : null}
          <Card.Title>{media.username} saved this {props.mediaType}
            <p className='small'>{moment(media.createdAt).calendar()}</p>
          </Card.Title>
          {/* <MakeFavorite
            username={media.username}
            media={media}
            makeFavorite={props.makeFavorite}
          /> */}
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
          <div id="center-wrap-tall">
            <p className='ratingReviewHeading'>{media.username}'s Rating</p>
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
            <p className='ratingReviewHeading'>{media.username}'s Review</p>
          </div>
          <div className='scroll-box'>
            {media.userReview.length ? media.userReview : "What's good... and what's not? No idea, there's no review yet!"}
          </div>
          {/* <RateSaved
            username={media.username}
            // mediaType={'Book'}
            media={media}
            startRating={props.startRating}
            selectedMediaRating={props.selectedMediaRating}
            handleRatingFormSubmit={props.handleRatingFormSubmit}
            setUserRating={props.setUserRating}
            userRating={props.userRating}
            setHover={props.setHover}
            hover={props.hover}
          />
          <ReviewSaved
            username={media.username}
            // mediaType={'Book'}
            media={media}
            startReview={props.startReview}
            selectedMediaReview={props.selectedMediaReview}
            handleReviewFormSubmit={props.handleReviewFormSubmit}
            setReviewInput={props.setReviewInput}
          /> */}
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
          <Button className='btn-block btn-danger' onClick={() => props.handleDeleteGame(media._id)}>
            Delete this Game!
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ProfileFeedCard;