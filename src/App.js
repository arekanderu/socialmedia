import React, { useState, useEffect } from 'react';
import Login from './components/login';
import firebase from './config/database';
import Homepage from './components/homepage';

/**
 * 1. Need to associate first name and last name to account.
 * 2. Need to remember its logged in.
 */

const App = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailErrorMessage, setEmailErrorMessage ] = useState('');
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
  const [ user, setUser ] = useState('');

  const handleSignUp = () => {
    clearErrors();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("New account successfully created.");
    })
    .catch((error) => {
      handleError(error);
    })
  }

  const handleLogin = () => {
    clearErrors();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User successfully logged in.")
      })
      .catch((error) => {
        handleError(error);
      })
  }

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      //sign-out
    }).catch((error) => {
    });
  }

  const handleError = (error) => {
    switch(error.code) {
      case "auth/invalid-email":
      case "auth/user-disabled":
      case "auth/user-not-found":
      case "auth/email-already-in-use":
        setEmailErrorMessage(error.message);
        break;

      case "auth/wrong-password":
      case "auth/weak-password":
        setPasswordErrorMessage(error.message);
        break;
      default:
        break;
    }
  }

  const clearErrors = () => {
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
  }

  const authListener = () => {
    firebase.auth().onAuthStateChanged((userCredential) => {
      if(userCredential){
        setUser(userCredential);
      }

      else{
        setUser("");
      }
    })
  }

  useEffect(() =>{
    authListener();
  }, [])


  return(
    <div>
      {user ?
        <Homepage /> :
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          handleSignUp={handleSignUp}
        />
      }
    </div>
  )
}

export default App;