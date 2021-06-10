import React, { useState, useEffect } from 'react';
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
  const [ colorChange, setColorChange ] = useState("#808080");
  const [ userId, setUserId ] = useState([]);
  const [ postId, setPostId ] = useState([]);

  //TRY TO ONLY SHOW POST THAT HAS YOUR ACCOUNT EXISTS THEN ITERATE TO YOUR LIKE COMPONENT....

  useEffect(() =>{
    /**
     * The function checks the database for post that has been liked and
     * apply set it to the local.
     */
    const checkLikeStatus = () => {
      firebase.database().ref('likes/').once("value", snapshot => {
        let arrayPostId = [],
            arrayUserId = [];

          snapshot.forEach(item => {
            arrayUserId.push(item.val());
            arrayPostId.push(item.key);
           });

           setUserId(arrayUserId);
           setPostId(arrayPostId);
        })
      }

    checkLikeStatus();

  }, [firebase, uid]);

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

              <Likes
                firebase={firebase}
                uid={uid}
                databaseKey={databaseKeys[i]}
                color={colorChange}
                setColorChange={setColorChange}
                postId={postId}
                userId={userId}
              />
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