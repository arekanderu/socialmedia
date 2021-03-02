import React from 'react';
import { Container, List, ListItem, Divider, ListItemText, ListItemAvatar } from '@material-ui/core';
import ProfileAvatar from './profileAvatar';

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
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
             <ProfileAvatar firstName={firstName} lastName={lastName}/>
             </ListItemAvatar>
            <ListItemText primary={fullName} secondary={
              <div className="content">
                <small>
                  {date}
                </small>

                <br /><br />
                <span>
                  {content}
                </span>
              </div>
                }>
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}

    </Container>
    </div>
  )
}

export default Posts;