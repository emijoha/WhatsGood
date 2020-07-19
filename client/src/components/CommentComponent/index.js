import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Text, Form } from 'react-bootstrap';
import { addComment, addNotification } from '../../utils/API';
import UserInfoContext from '../../utils/UserInfoContext'
import "./style.css";


const CommentComponent = ({ cb, comments, mediaId, mediaType, title, ownerId, commenterUsername }) => {

    const userData = useContext(UserInfoContext);
    const [commentInput, setCommentInput] = useState("");
    // const [allComments, setAllComments] = useState([]);
    // const [localCommentInput, setLocalCommentInput] = useState("");
    

    // useEffect(() => {
    //     setAllComments(comments);
    // }, [comments])

    // const handleAddComment = () => {
    //     let localCommentData = {
    //         commenterUsername: commenterUsername,
    //         content: localCommentInput
    //     };
    //     setAllComments(comments.push(localCommentData));
    //     cb(mediaId, mediaType, ownerId, title, commenterUsername, localCommentInput);
    //     setLocalCommentInput("");
    // }

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
            likerUsername: commenterUsername,
            title: title,
            ownerId: ownerId,
            type: "comment"
        };

        addComment(commentData)
            .then(() => {
                userData.getUserData();
            })
            .catch(err => console.log(err));

        addNotification(notificationData)
            .then(() => {
                userData.getUserData();
            })
            .catch(err => console.log(err));
    }


    return (
        <div>
            <p className='comment-label'>Comments</p>
            <div className='comment-box'>
            {comments.map(comment => {
                return (
                    <p className='comments'><span className='commenter'>{comment.commenterUsername}:</span> {comment.content}</p>
                )
            })}
            </div>
            <Form 
            // onSubmit={(event) => {
            //     event.preventDefault();
            //     setLocalCommentInput(event.target.value);
            //     handleAddComment();
            // }}
            >
                <Form.Group controlId="comment-input">
                    <Form.Control className='comment-input' type="text" placeholder="Leave a comment" value={commentInput} onChange={(e) => {
                        setCommentInput(e.target.value);
                    }} />
                </Form.Group>
                <Button id="comment-button" className='btn-block btn-primary' onClick={() => handleSaveComment()}>
                    Comment!
                </Button>
            </Form>
        </div>
    )
}

export default CommentComponent;