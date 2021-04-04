import React from 'react';
import { Container, Card, CardHeader, IconButton, CardContent, CardActions } from '@material-ui/core';
import ProfileAvatar from './profileavatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Popover from './popover';

const Posts = (props) => {
  const { databasePosts,
          databaseKeys,
          firstName,
          lastName,
          editPost,
          deletePost } = props;

  const fullName = firstName + ' ' + lastName;

  return(
    <div className="posts">
    <br />
    <Container>
      {Object.values(databasePosts).map(({content, date}, i) => (
        <Card variant="outlined" style={{marginBottom: 20}} key={i}>
          <CardHeader
            avatar={<ProfileAvatar firstName={firstName} lastName={lastName}/>}
            action={
              <IconButton aria-label="settings">
                <Popover
                  editPost={editPost}
                  content={content}
                  databaseKey={databaseKeys[i]}
                  deletePost={deletePost}
                />
              </IconButton>
            }
            title={fullName}
            subheader={date}
          />

          <CardContent>
            {content}
          </CardContent>

          <CardActions>
            <IconButton size="small">
              <FavoriteIcon />
              <small className="comment-action">Like</small>
            </IconButton>
            <IconButton size="small">
              <ChatBubbleOutlineIcon />
              <small className="comment-action">Comment</small>
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Container>
    </div>
  )
}

export default Posts;