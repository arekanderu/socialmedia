import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';

const signup = (props) => {
  const {  } = props;
  return(

    <div className="signup">
      <Dialog open={true} aria-labelledby="form-dialog-title">
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
            autoFocus
            required
          />

          <br /><br />

          <TextField
            id="email-signup-input"
            label="Email"
            variant="outlined"
            autoFocus
            required
            fullWidth
          />

          <br /><br />

          <TextField
            id="password-signup-input"
            label="Password"
            variant="outlined"
            autoFocus
            required
            fullWidth
          />
        </DialogContent>

        <DialogActions >
          <Button variant="contained" color="secondary">
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default signup;