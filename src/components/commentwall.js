import React, { useState, useEffect } from 'react';
import ProfileAvatar from './profileavatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const CommentWall = (props) => {
  const { firebase,
          databaseKey,
          firstName,
          lastName } = props;

  const [ databasePosts, setDatabasePost ] = useState([]);

  useEffect(() => {
    /**
     * Read the comment in database and push it to the state.
     */
    const database = () => {
      let ref = firebase.database().ref('comments/' + databaseKey);
        ref.orderByChild('date').on('value', snapshot => {

          let arrayPosts = [];

        snapshot.forEach(item => {
            arrayPosts.push(item.val());
        })
        setDatabasePost(arrayPosts.reverse());
      })
    }
    database();
  }, [firebase, databaseKey])


  return(
  <div className="comment-wall">
    {Object.values(databasePosts).map(({content, date}, i) => (
      <ul>
        <li>

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

            <div className="comment-content">
              <small>{content}</small>
            </div>
          </div>

            <div className="comment-more">
              <MoreHorizIcon />
            </div>
        </li>
      </ul>

    ))}
  </div>
  );
}

export default CommentWall;