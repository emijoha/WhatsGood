import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Col, Row } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';
import LikeButton from '../LikeButton';
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
                    <Card.Title>{media.username} saved a {props.mediaType}</Card.Title>
                    <Card.Text>{moment(media.createdAt).calendar()}</Card.Text>
                    {media.image 
                        ?   <div id="center-wrap">
                                <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' /> 
                            </div>
                        : null}
                    <div id="center-wrap">
                        <Card.Title>{media.title}</Card.Title>
                        <p className='small'>Authors: {media.authors}</p> 
                    </div>
                    <Card.Text>Plot: {media.description}</Card.Text>
                    <LikeButton mediaLikes={media.likes}
                        mediaType={media.mediaType}
                        mediaId={media._id}
                        cb={props.handleSaveLike}
                        userData={props.userData}
                    />
                    <Button className='btn-block btn-danger' >
                        Comment
                    </Button>
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
                    <Card.Text>{media.username}</Card.Text>
                    <Card.Text>{moment(media.createdAt).calendar()}</Card.Text>
                    {media.image 
                        ?   <div id="center-wrap">
                                <Card.Img id="media-pic" src={media.image} alt={media.artist} variant='top' /> 
                            </div>
                        : null}
                    <div id="center-wrap">
                        <Card.Title>{media.title}</Card.Title>
                        <p className='small'>Artist: {media.artist}</p> 
                        <ReactAudioPlayer 
                            id="music-player"
                            src={media.preview}
                            controls
                        />
                    </div>
                    <LikeButton mediaLikes={media.likes}
                        mediaType={media.mediaType}
                        mediaId={media._id}
                        cb={props.handleSaveLike}
                        userData={props.userData}
                    />
                    <Button className='btn-block btn-danger' >
                        Comment
                    </Button>
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
                    <Card.Text>{media.username}</Card.Text>
                    <Card.Text>{moment(media.createdAt).calendar()}</Card.Text>
                    {media.image 
                        ?   <div id="center-wrap">
                                <Card.Img id="media-pic" src={media.image} alt={`The cover for ${media.title}`} variant='top' /> 
                            </div>
                        : null}
                    <div id='center-wrap'>
                        <Card.Title>{media.title}</Card.Title>
                        <p className='small'>Director {media.director}</p>
                        <p className='small'>Starring {media.actors}</p>
                    </div>
                    <Card.Text>Plot: {media.plot}</Card.Text>
                    <LikeButton mediaLikes={media.likes}
                        mediaType={media.mediaType}
                        mediaId={media._id}
                        cb={props.handleSaveLike}
                        userData={props.userData}
                    />
                    <Button className='btn-block btn-danger' >
                        Comment
                    </Button>
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
                    <Card.Text>{media.username}</Card.Text>
                    <Card.Text>{moment(media.createdAt).calendar()}</Card.Text>
                    {media.image 
                        ?   <div id="center-wrap">
                                <Card.Img id="media-pic" src={media.image} alt={`The image for ${media.title}`} variant='top' /> 
                            </div>
                        : null}
                    <Card.Title>{media.title}</Card.Title>
                    <p className='small'>Developer: {media.developer}</p>
                    <Card.Text>Description: {media.description}</Card.Text>
                    <LikeButton mediaLikes={media.likes}
                        mediaType={media.mediaType}
                        mediaId={media._id}
                        cb={props.handleSaveLike}
                        userData={props.userData}
                    />
                    <Button className='btn-block btn-danger' >
                        Comment
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

export default FeedCard;