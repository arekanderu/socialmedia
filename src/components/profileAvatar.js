import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}));

const ProfileAvatar = (props) => {
  const { firstName,
          lastName,
          size } = props;
  const classes = useStyles();
  let isSmall = '';

  if(size === 'small'){
    isSmall = classes.small;
  }

  return(
    <Avatar className={isSmall} alt="picture" src="/static/images/avatar/1.jpg">
      <span>{firstName.substring(0,1)}{lastName.substring(0,1)}</span>
  </Avatar>
  )
}

export default ProfileAvatar;