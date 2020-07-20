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


function ProfileFeedCard(props) {
  if (props.media.mediaType === 'Book') {
    const media = props.media;
    console.log(media.authors)
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
            <RateSaved
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
            />
          </div>
          <MakeFavorite
            username={media.username}
            media={media}
            makeFavorite={props.makeFavorite}
          />
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
            mediaComments={media.comments}
          />
          <Button className='btn-block btn-danger' onClick={() => props.handleDeleteBook(media._id)}>
            Delete this Book!
          </Button>
        </Card.Body>
      </Card>
    )
  } else if (props.media.mediaType === 'Music') {
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
              <RateSaved
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
              />
            </div>
            <ReactAudioPlayer
              id="music-player"
              src={media.preview}
              controls
            />
          </div>
          <MakeFavorite
            username={media.username}
            media={media}
            makeFavorite={props.makeFavorite}
          />
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
          <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMusic(media._id)}>
            Delete this Music!
          </Button>
        </Card.Body>
      </Card>
    );
  } else if (props.media.mediaType === 'Movie') {
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
            <RateSaved
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
            />
          </div>
          <MakeFavorite
            username={media.username}
            media={media}
            makeFavorite={props.makeFavorite}
          />
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
            <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMovie(media._id)}>
            Delete this Movie!
          </Button>
        </Card.Body>
      </Card>
    );
  } else if (props.media.mediaType === 'Game') {
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
            <RateSaved
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
            />
          </div>
          <MakeFavorite
            username={media.username}
            media={media}
            makeFavorite={props.makeFavorite}
          />
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
            <Button className='btn-block btn-danger' onClick={() => props.handleDeleteGame(media._id)}>
            Delete this Game!
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ProfileFeedCard;