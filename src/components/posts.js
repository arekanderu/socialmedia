import React, { useState, useEffect } from 'react';
import { Container, Card, CardHeader, IconButton, CardContent, CardActions, Divider, Collapse } from '@material-ui/core';
import ProfileAvatar from './profileavatar';
import LikeIcon from './likeicon';
import CommentIcon from './commenticon';
import LikeCounter from './likecounter';
import CommentBar from './commentbar';
import CommentWall from './commentwall';
import Popover from './popover';

const Posts = (props) => {
  const { databasePosts,
          databaseKeys,
          firstName,
          lastName,
          editDialog,
          deleteDialog,
          firebase,
          uid,
          imageUrl } = props;

  const fullName = firstName + ' ' + lastName;
  const [ postId, setPostId ] = useState([]);
  const [ open, setOpen ] = useState('');

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
     * The function checks the database for post ids for likes.
     */
    const readLikeDatabase = () => {
      firebase.database().ref('likes/').once("value", snapshot => {
        let arrayPostId = [];

          snapshot.forEach(item => {
            arrayPostId.push(item.key);
           });
           setPostId(arrayPostId);
        })
      }

      readLikeDatabase();
      // eslint-disable-next-linefilterArray();

  }, [ firebase, uid, postId ]);

  return(
    <div className="posts">
    <br />
    <Container>
      {databasePosts.length > 0 ?
      Object.values(databasePosts).map(({content, date}, i) => (
        <Card variant="outlined" style={{marginBottom: 20}} key={i}>
          <CardHeader
            avatar={<ProfileAvatar
                      firstName={firstName}
                      lastName={lastName}
                      imageUrl={imageUrl}/>}
            action={
              <IconButton aria-label="settings">
                <Popover
                  firstBox={'Edit Post'}
                  secondBox={'Move to trash'}
                  editDialog={editDialog}
                  content={content}
                  postId={databaseKeys[i]}
                  deleteDialog={deleteDialog}
                  functionality={'post'}
                />
              </IconButton>
            }
            title={fullName}
            subheader={date}
          />

          <CardContent>
            {content}

          <Divider />

          <LikeCounter
            firebase={firebase}
            uid={uid}
            postId={postId}
            databaseKey={databaseKeys[i]}
            fullName={fullName}
            />
          </CardContent>

          <Divider />

            <CardActions>
              <LikeIcon
                firebase={firebase}
                uid={uid}
                databaseKey={databaseKeys[i]}
                filteredArray={filterArray(databaseKeys[i])}
              />
              <CommentIcon
                open={open}
                setOpen={setOpen}
                index={i}
              />
            </CardActions>
          <Divider/>

          <CommentWall
            firebase={firebase}
            databaseKey={databaseKeys[i]}
            firstName={firstName}
            lastName={lastName}
            postId={postId}
            imageUrl={imageUrl}
          />
          <Collapse in={open === i}>
            <CommentBar
              firstName={firstName}
              lastName={lastName}
              firebase={firebase}
              databaseKey={databaseKeys[i]}
              imageUrl={imageUrl}
            />
          </Collapse>

        </Card>
      ))
    : 'No post to display.' }
    </Container>
    </div>
  )
}

export default Posts;