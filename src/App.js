import React, { useState, useEffect } from 'react';
import Login from './components/login';
import firebase from './config/database';
import Homepage from './components/homepage';

const App = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailErrorMessage, setEmailErrorMessage ] = useState('');
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
  const [ user, setUser ] = useState('');
  const [ firstName, setFirstName] = useState('');
  const [ lastName, setLastName ] = useState('');


  const handleSignUp = (firstName, lastName) => {
    clearErrors();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return firebase.database().ref('users/' + userCredential.user.uid).set({
          email: userCredential.user.email,
          firstname: firstName,
          lastname: lastName
        })
    })
    .catch((error) => {
      handleError(error);
    })
  }

  const handleLogin = () => {
    clearErrors();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User successfully logged in.");
      }).catch((error) => {
        handleError(error);
      })
  }

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      setUser("");
      setFirstName("");
      setLastName("");
    }).catch(() => {
      console.log('There was an error.')
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

  useEffect(() =>{
    let unsubscribe = firebase.auth().onAuthStateChanged((userCredential) => {
      if(userCredential){
        setUser(userCredential);

          firebase.database().ref('users/' + user.uid).once('value')
          .then(snapshot => {
            setFirstName(snapshot.child("firstname").val());
            setLastName(snapshot.child("lastname").val());
          })
          return () => unsubscribe();
      }

      else{
        setUser("");
      }
    })
  },[firebase.auth()])


  return(
    <div>
      {user ?
        <Homepage
          handleLogout={handleLogout}
          firstName={firstName}
          lastName={lastName}
        /> :
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