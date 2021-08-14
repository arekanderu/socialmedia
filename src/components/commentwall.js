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
  const [ textValue, setTextValue ] = useState('');

  /**
   * Will set view more to true to open all comments then it will
   * clear the "View more" text to nothing to hide it.
   */
  const showMoreComment = () => {
    setViewMore(true);
    setMessage('');
  }

  /**
   * Set edit comment to true to prepare to edit the comment then
   * capture the comment id.
   */
  const action = (id) => {
    setTriggerEditComment(true);
    setCommentIdToEdit(id);
  }

  useEffect(() => {
    let ref = firebase.database().ref('comments/' + databaseKey);

    /**
     * By default it will only show 1 comment. Else it will show
     * all of the comment
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
     * Retrieve all comment id's
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

  }, [firebase, databaseKey, postId, viewMore, textValue])


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
                textValue={textValue}
                setTextValue={setTextValue}
                firebase={firebase}
                postId={databaseKey}
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
                  content={content}
                  setTextValue={setTextValue}
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