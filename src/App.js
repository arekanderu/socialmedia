import React, { useState } from 'react';
import Login from './components/login';
import firebase from './config/database';

const App = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
   firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

    })
    .catch((error) => {
      alert(error);
    })
  }

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //signed in
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setError(true);
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
        errorMessage={errorMessage}
      />
    </div>
  )
}

export default App;