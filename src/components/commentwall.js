import React, { useState, useEffect } from 'react';
import ProfileAvatar from './profileavatar';
import Popover from './popover';
import { IconButton } from '@material-ui/core';
import Comment from './comment';

const CommentWall = (props) => {
  const { firebase,
          databaseKey,
          firstName,
          lastName,
          postId } = props;

  const [ commentOnPost, setCommentOnPost ] = useState([]);
  const [ commentOnPostId, setCommentOnPostId ] = useState([]);
  const [ commentCounter, setCommentCounter ] = useState(0);
  const [ message, setMessage ] = useState('View more comments');
  const [ viewMore, setViewMore ] = useState(false);
  const [ triggerEditComment, setTriggerEditComment ] = useState(false);
  const [ commentIdToEdit, setCommentIdToEdit ] = useState('');


  /**
   * UPDATE ME!!!
   *
   */
  const showMoreComment = () => {
    setViewMore(true);
    setMessage('');
  }

  /**
   * UPDATE ME !!!!
   */
  const action = (id) => {
    setTriggerEditComment(true);
    setCommentIdToEdit(id);
  }

  useEffect(() => {
    let ref = firebase.database().ref('comments/' + databaseKey);
    /**
     * Read the comment in database and push it to the state.
     * Query is only limit to 1 which is the very previous
     * comment.
     *
     * UPDATE ME....
     */
    const commentView = () => {
      let arrayPosts = [];

      if(!viewMore) {
        ref.limitToLast(1).once('value', snapshot => {

          snapshot.forEach(item => {
            arrayPosts.push(item.val());
          })

          setCommentOnPost(arrayPosts);
        })
      }

      else {
        ref.once('value', snapshot => {

          snapshot.forEach(item => {
            arrayPosts.push(item.val());
          })

          setCommentOnPost(arrayPosts);
        })
      }

    }

    /**
     * Check the database how many comments one post has.
     */
    const checkForMoreComments = () => {
      ref.once("value", snapshot => {
        let children = snapshot.numChildren();
        setCommentCounter(children);
         });
    }

    /**
     * UPDATE ME
     */
    const retriveKeys = () => {
      firebase.database().ref('comments/' + databaseKey).once("value", snapshot => {
        let arrayKeys = [];

        snapshot.forEach(item => {
          arrayKeys.push(item.key);
        })

        setCommentOnPostId(arrayKeys);
      });
    }

    commentView();
    checkForMoreComments();
    retriveKeys();

  }, [firebase, databaseKey, postId, viewMore])


  return(
  <div className="comment-wall">
    <ul>
    {Object.values(commentOnPost).map(({content}, i) => (
        <li key={i}>
          <div className="comment-avatar">
            <ProfileAvatar
              firstName={firstName}
              lastName={lastName}
              size='small'
            />
          </div>

          <div className="comment-wall-chatbox">
            <small className="comment-first-last-name">
              <a href="/#">{firstName} {lastName}</a>
            </small>

              <Comment
                content={content}
                triggerEditComment={triggerEditComment}
                commentId={commentOnPostId[i]}
                commentIdToEdit={commentIdToEdit}
              />
          </div>

            <div className="comment-more">
              <IconButton aria-label="settings">
                <Popover
                  postId={databaseKey}
                  commentId={commentOnPostId[i]}
                  firebase={firebase}
                  firstBox={'Edit'}
                  secondBox={'Delete'}
                  functionality={'comment'}
                  action={action}
                />
              </IconButton>
            </div>
            <br />
            {commentCounter > 1 ? <u className="comment-view-more-comment" onClick={showMoreComment}>{message}</u> : '' }

        </li>
    ))}
    </ul>
  </div>
  );
}

export default CommentWall;