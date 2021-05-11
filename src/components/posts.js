import React from 'react';
import { Container, Card, CardHeader, IconButton, CardContent, CardActions, Divider } from '@material-ui/core';
import ProfileAvatar from './profileavatar';
import Popover from './popover';
import Likes from './likes';
import Comments from './comments';

const Posts = (props) => {
  const { databasePosts,
          databaseKeys,
          firstName,
          lastName,
          editDialog,
          deleteDialog,
          firebase,
          uid } = props;

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
                  editDialog={editDialog}
                  content={content}
                  databaseKey={databaseKeys[i]}
                  deleteDialog={deleteDialog}
                />
              </IconButton>
            }
            title={fullName}
            subheader={date}
          />

          <CardContent>
            {content}
          </CardContent>

          <Divider />
            <CardActions>
              <Likes firebase={firebase} uid={uid}/>
              <Comments />
            </CardActions>
          <Divider />
          <br />
        </Card>
      ))}
    </Container>
    </div>
  )
}

export default Posts;