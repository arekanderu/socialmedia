import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  }
}));

const ProfileAvatar = (props) => {
  const { firstName,
          lastName,
          size } = props;
  const classes = useStyles();
  let propSize = '';

  if(size === 'small'){
    propSize = classes.small;
  }

  else if(size === 'large'){
    propSize = classes.large;
  }

  return(
    <div className="main-avatar">
       <Avatar className={propSize} alt="picture" src="/static/images/avatar/1.jpg">
        <span>{firstName.substring(0,1)}{lastName.substring(0,1)}</span>
      </Avatar>
    </div>

  )
}

export default ProfileAvatar;