import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Signup = (props) => {
  const { clicked,
          setClicked,
          handleSignUp,
          error,
           emailErrorMessage,
           passwordErrorMessage } = props;

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
            error={error}
          />

          <br /><br />

          <TextField
            id="password-signup-input"
            label="Password"
            variant="outlined"
            required
            fullWidth
            error={error}
          />
          <p className="error-message">{passwordErrorMessage, emailErrorMessage}</p>
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