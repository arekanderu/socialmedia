import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import firebase from '../config/database';
import Create from './create';
import ProfileAvatar from './profileavatar';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Homepage = (props) => {
  const { handleLogout,
          uid } = props;
  const classes = useStyles();
  const [ firstName, setFirstName] = useState('');
  const [ lastName, setLastName ] = useState('');

  useEffect(() =>{
    firebase.database().ref('users/' + uid).once('value')
                        .then(snapshot => {
                          setFirstName(snapshot.child("firstname").val());
                          setLastName(snapshot.child("lastname").val());
    });
  },[uid])

  return(
    <div className="homepage">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <SupervisedUserCircleIcon />
            Social Network
          </Typography>

          <ProfileAvatar firstName={firstName} lastName={lastName}/>
          &nbsp;{firstName} |
          <Button color="inherit" onClick={handleLogout} >Log out</Button>
        </Toolbar>
      </AppBar>

      <Create
        firstName={firstName}
        lastName={lastName}
        firebase={firebase}
        uid={uid}
      />

    </div>
  )
}

export default Homepage;