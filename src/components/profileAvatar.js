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
          size,
          imageUrl} = props;
  const classes = useStyles();
  let propSize = '',
      avatarPicture = 'avatar-picture';

  if(size === 'small'){
    propSize = classes.small;
    avatarPicture = 'avatar-picture-small';
  }

  else if(size === 'large'){
    propSize = classes.large;
    avatarPicture = 'avatar-picture-large';
  }

  return(
    <div className="main-avatar">
      {imageUrl ?
        <img src={imageUrl} alt="avatar-pic" className={avatarPicture}/>
        :
        <Avatar className={propSize} alt="picture" src="/static/images/avatar/1.jpg">
          <span>{firstName.substring(0,1)}{lastName.substring(0,1)}</span>
       </Avatar>
      }
    </div>

  )
}

export default ProfileAvatar;