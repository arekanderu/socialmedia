import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../config/database';


/*add first and last name.
*/

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
  const config = () => firebase.database().ref('users/' + uid).once('value')
                        .then(snapshot => {
                          setFirstName(snapshot.child("firstname").val());
                          setLastName(snapshot.child("lastname").val());
  });

  useEffect(() =>{
    config();
  },[])

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
           Welcome {firstName} {lastName} |
          <Button color="inherit" onClick={handleLogout} >Logout</Button>
        </Toolbar>
      </AppBar>

    </div>
  )
}

export default Homepage;