import React, { useState } from 'react';
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
          emailErrorMessage,
          passwordErrorMessage,
          handleSignUp } = props;
  const [ clicked, setClicked ] = useState(false);
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
        <p className="error-message">{emailErrorMessage, passwordErrorMessage}</p>
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>

       <br/><br /><hr/><br />
       <Button variant="contained" color="secondary" fullWidth onClick={() => setClicked(!clicked)}>
          Sign up
        </Button>
      </div>

      <SignUp
        clicked={clicked}
        setClicked={setClicked}
        handleSignUp={handleSignUp}
        error={error}
        emailErrorMessage={emailErrorMessage}
        passwordErrorMessage={passwordErrorMessage}
      />

    </div>
  )
}

export default Login;