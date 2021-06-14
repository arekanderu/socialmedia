import React, { useState, useEffect } from 'react';
import { Container, Card, CardHeader, IconButton, CardContent, CardActions, Divider } from '@material-ui/core';
import ProfileAvatar from './profileavatar';
import Popover from './popover';
import Likes from './likes';
import Comments from './comments';
import LikeCounter from './likecounter';

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
  const [ postId, setPostId ] = useState([]);

  /**
   *
   * @param databaseKey the post id keys.
   * @returns filters the table for only id's that exist in your wall.
   */
  const filterArray = (databaseKey) => {
    return postId.filter((item) => item === databaseKey);
  }

  useEffect(() =>{
    /**
     * The function checks the database for post ids.
     */
    const readDatabase = () => {
      firebase.database().ref('likes/').once("value", snapshot => {
        let arrayPostId = [];

          snapshot.forEach(item => {
            arrayPostId.push(item.key);
           });
           setPostId(arrayPostId);
        })
      }

      readDatabase();
      // eslint-disable-next-linefilterArray();

  }, [firebase, uid, postId ]);

  return(
    <div className="posts">
    <br />
    <Container>
      {databasePosts.length > 0 ?
      Object.values(databasePosts).map(({content, date}, i) => (
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
          <LikeCounter
            firebase={firebase}
            uid={uid}
            postId={postId}
            databaseKey={databaseKeys[i]}
            />
          </CardContent>

          <Divider />

            <CardActions>
              <Likes
                firebase={firebase}
                uid={uid}
                databaseKey={databaseKeys[i]}
                filteredArray={filterArray(databaseKeys[i])}
              />
              <Comments />
            </CardActions>
          <Divider />
          <br />
        </Card>
      ))
    : 'No post to display.' }
    </Container>
    </div>
  )
}

export default Posts;