import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { makeStyles } from '@material-ui/core/styles';
import firebase from './config/database';

/*add first and last name.
*/

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Homepage = (props) => {
  const { handleLogout } = props;
  const classes = useStyles();
  const firstName = firebase.database().ref('users')
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
          <Button color="inherit" onClick={handleLogout} >Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Homepage;