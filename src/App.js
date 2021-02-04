import React, { useState } from 'react';
import Login from './components/login';
import firebase from './config/database';

const App = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(false)
  //need to set error for signup
  const [ emailErrorMessage, setEmailErrorMessage ] = useState('');
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');

  const handleSignUp = () => {
   firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

    })
    .catch((error) => {
      switch(error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailErrorMessage(error.message);
          setError(true);
          alert('yow')
        break;

        case "auth/wrong-password":
          setPasswordErrorMessage(error.messagee);
          setError(true)
      }
    })
  }

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //signed in
      })
      .catch((error) => {
        switch(error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailErrorMessage(error.message);
            setError(true);
          break;

          case "auth/wrong-password":
            setPasswordErrorMessage(error.messagee);
            setError(true)
        }
      })
  }

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      //sign-out
    }).catch((error) => {

    });

  }

  return(
    <div>
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        error={error}
        emailErrorMessage={emailErrorMessage}
        passwordErrorMessage={passwordErrorMessage}
        handleSignUp={handleSignUp}
      />
    </div>
  )
}

export default App;