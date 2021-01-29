import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD8NB2cc2HoCPeDG4qkI7L0NHuVeGNKZrs",
  authDomain: "socialmediadb-65072.firebaseapp.com",
  projectId: "socialmediadb-65072",
  storageBucket: "socialmediadb-65072.appspot.com",
  messagingSenderId: "524840700428",
  appId: "1:524840700428:web:75249d83726dea5cfabc29",
  measurementId: "G-E9L06H223S"
};

// Initialize Firebase
const firebase = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
