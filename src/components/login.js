import React, { useState, useEffect } from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { TextField, Button } from '@material-ui/core';
import SignUp from './signup';

const Login = (props) => {
  const { email,
          setEmail,
          password,
          setPassword,
          handleLogin,
          emailErrorMessage,
          passwordErrorMessage,
          handleSignUp } = props;
  const [ errorEmail, setErrorEmail ] = useState(false)
  const [ errorPassword, setErrorPassword ] = useState(false);
  const [ clicked, setClicked ] = useState(false);

  const flagError = () => {
    if(!clicked) {
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
  }

  useEffect(() =>{
    flagError();
  })

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
          value={email}
          error={errorEmail}
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
          error={errorPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {!clicked ?
        <p className="error-message">{emailErrorMessage} {passwordErrorMessage}</p> : '' }

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
        emailErrorMessage={emailErrorMessage}
        passwordErrorMessage={passwordErrorMessage}
      />

    </div>
  )
}

export default Login;