import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';


const Signup = (props) => {
  const { clicked,
          setClicked,
          handleSignUp,
          email,
          setEmail,
          password,
          setPassword,
          emailErrorMessage,
          passwordErrorMessage } = props;
  const [ errorEmail, setErrorEmail ] = useState(false);
  const [ errorPassword, setErrorPassword ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  const flagError = () => {
    if(emailErrorMessage !== '') {
      setErrorEmail(true);
    }

    else if(passwordErrorMessage !== ''){
      setErrorPassword(true);
    }

    else{
      setErrorEmail(false);
      setErrorPassword(false);
    }
    }

  useEffect(() =>{
    flagError();
  })

  return(
    <div className="signup">
      <Dialog open={clicked} aria-labelledby="form-dialog-title">
        <div className="close-icon">
          <CloseIcon onClick={() => setClicked(!clicked)} />
        </div>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent dividers>
          <TextField
            id="first-name-input"
            label="First Name"
            variant="outlined"
            autoFocus
            required

          />

          <TextField
            id="last-name-input"
            label="Last Name"
            variant="outlined"
            required
            style={{ marginLeft: '10px'}}

          />

          <br /><br />

          <TextField
            id="email-signup-input"
            label="Email"
            variant="outlined"
            required
            fullWidth
            error={errorEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <TextField
            id="password-signup-input"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            required
            fullWidth
            error={errorPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              )
            }}
          />

          <p className="error-message">{passwordErrorMessage}</p>
          <p className="error-message">{emailErrorMessage}</p>
        </DialogContent>

        <DialogActions >
          <Button variant="contained" color="secondary" fullWidth onClick={handleSignUp}>
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Signup;