import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyCu2U1TPzRmIvn_4pQU8SFWhq17FTz0JG4",
    authDomain: "cadastrar-projeto.firebaseapp.com",
    projectId: "cadastrar-projeto",
    storageBucket: "cadastrar-projeto.appspot.com",
    messagingSenderId: "674629138871",
    appId: "1:674629138871:web:5ebdc29523f2d2965e5032",
    measurementId: "G-SHJE9RBSS5"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;