import React from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { TextField, Button } from '@material-ui/core';
import SignUp from './signup';

const Login = (props) => {
  const { email,
          setEmail,
          password,
          setPassword,
          handleLogin,
          error,
          emailErrorMessage } = props;
  return(
    <div className="login">
      <h1 className="logo">
          <SupervisedUserCircleIcon />
          Social Network
      </h1>

      <div classNames="forms">
        <TextField
          id="email-input"
          label="Email"
          variant="outlined"
          fullWidth
          autoFocus
          required
          error={error}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <TextField
          id="password-input"
          label="Password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <p className="error-message">{emailErrorMessage}</p>
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>

       <br/><br /><hr/><br />
       <Button variant="contained" color="secondary" fullWidth>
          Sign up
        </Button>
      </div>

      <SignUp />

    </div>
  )
}

export default Login;