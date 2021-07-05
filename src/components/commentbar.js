import React, { useEffect } from 'react';
import ProfileAvatar from './profileavatar';
import { TextField, Grid  } from '@material-ui/core';

const Comments = (props) => {
  const { firstName,
          lastName,
          autoFocus  } = props;

  const focus = false;

  useEffect(() =>{
    /**
     *
     */
    const test = () => {
     if(autoFocus === true){
      console.log('hi')
     }
    }

      test();

  }, []);

  return(
    <div className="comment-bar">
      <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <div className="small-avatar">
              <ProfileAvatar
                firstName={firstName}
                lastName={lastName}
                size='small'
              />
            </div>
          </Grid>
          <Grid item xs={10} md={11}>
          <TextField
            fullWidth
            autoFocus={autoFocus}
          />
          </Grid>
      </Grid>
  </div>
  );
}

export default Comments;