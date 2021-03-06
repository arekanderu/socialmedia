import React, { useState, useEffect } from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import SignUp from './signup';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  const [ showPassword, setShowPassword ] = useState(false);

  useEffect(() =>{
    /**
     * A validation to make sure that email and password are populated before sending the data.
     */
    const validate = () => {
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

    validate();

  },[clicked, emailErrorMessage, passwordErrorMessage])

  return(
    <div className="login">
      <h1 className="logo">
          <SupervisedUserCircleIcon />
          Social Network
      </h1>

      <div>
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
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          fullWidth
          required
          value={password}
          error={errorPassword}
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
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

    </div>
  )
}

export default Login;