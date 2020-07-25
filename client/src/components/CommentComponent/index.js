import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Text, Form } from 'react-bootstrap';
import { addComment, addNotification } from '../../utils/API';
import UserInfoContext from '../../utils/UserInfoContext'
import "./style.css";


const CommentComponent = ({ mediaId, mediaType, title, ownerId, commenterUsername, mediaComments }) => {

  const userData = useContext(UserInfoContext);

  const [commentInput, setCommentInput] = useState();
  const [commentsOnMedia, setCommentsOnMedia] = useState(mediaComments)

  // useEffect(() => {
  //   console.log("comments on media", commentsOnMedia)
  // }, [commentsOnMedia]);

  // Here's the stuff to create a comment and add notification for comment

  const handleSaveComment = () => {

    const commentData = {
      commenterUsername: commenterUsername,
      content: commentInput,
      mediaType: mediaType,
      mediaId: mediaId
    };

    // info for notification
    const notificationData = {
      mediaId: mediaId,
      likerUsername: commenterUsername,
      title: title,
      ownerId: ownerId,
      type: "comment",
      mediaType: mediaType,
      comment: commentInput
    };

    addComment(commentData)
      .then((result) => {
        userData.getUserData();
        setCommentsOnMedia([...commentsOnMedia, result.data]);
      })
      .catch(err => console.log(err));

    addNotification(notificationData)
      .then(() => {
        userData.getUserData();
      })
      .catch(err => console.log(err));

    setCommentInput('');
  }

  return (
    <div>
      <Form onSubmit={(event) => {
        event.preventDefault();
        setCommentInput(event.target.value);
        handleSaveComment();
      }}>
        <p className='comment-label'>Comments:</p>
        {
          commentsOnMedia.length
            ? <div className='comment-box'>
              {commentsOnMedia.map(comment => {
                console.log("comment.content", comment.content)
                return (
                  <p className='comments' key={comment._id}><span className='commenter'>{comment.commenterUsername}:</span> {comment.content}</p>
                )
              })}
            </div>
            : null
        }
        <Form.Group id='comment-grouping' controlId="comment-input">
          <Form.Control className='comment-input' type="text" placeholder="Leave a comment" value={commentInput} onChange={(e) => {
            setCommentInput(e.target.value);
          }} />
        </Form.Group>
        {/* <Button id="comment-button" className='btn-block btn-primary' onClick={handleSaveComment}>
          Comment!
                </Button> */}
      </Form>
    </div>
  )
}

export default CommentComponent;