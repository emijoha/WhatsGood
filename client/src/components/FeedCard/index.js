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
  function randomNum() {
    return Math.floor(Math.random() * 4) + 1;
  }

  if (props.mediaType === 'book') {
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
          <LikeButton mediaLikes={media.likes}
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
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
    )
  } else if (props.mediaType === 'music') {
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
  } else if (props.mediaType === 'movie') {
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
          <LikeButton mediaLikes={media.likes}
            mediaType={media.mediaType}
            ownerId={media.userId}
            mediaId={media._id}
            title={media.title}
            cb={props.cb}
            userData={props.userData}
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
      <Card className={`game-border${randomNum()}`} key={media._id} border='dark'>
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
            <Card.Title><b>{media.title.toUpperCase()}</b>
              <p className='by'>Developer: {media.developer}</p>
            </Card.Title>
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
    console.log('from FeedCard: ', media, props.userData)
    return (
      <Card key={props.media.mediaId} border='dark'>
        <Card.Body>
          {props.userData.picture
            ? <Card.Img id="profile-pic" src={props.userData.picture} alt={props.userData.username} variant='top' />
            : null}
          <Card.Title>{props.userData.username} saved this {media.mediaType.toLowerCase()}
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