import React from 'react';
import { Container, Card, CardHeader, IconButton, CardContent, CardActions } from '@material-ui/core';
import ProfileAvatar from './profileAvatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const Posts = (props) => {
  const { databasePosts,
          firstName,
          lastName } = props;

  const fullName = firstName + ' ' + lastName;

  return(
    <div className="posts">
    <br />
    <Container>
      {Object.values(databasePosts).map(({content, date}, i) => (
        <Card variant="outlined" style={{marginBottom: 20}} >
          <CardHeader
            avatar={<ProfileAvatar firstName={firstName} lastName={lastName}/>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
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