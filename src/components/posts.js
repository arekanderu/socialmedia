import React from 'react';
import Container from '@material-ui/core/Container';
import ProfileAvatar from './profileAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

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