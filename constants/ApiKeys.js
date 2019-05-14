import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBNkicTWQam_Bwok0XHRvZl3FZ4eapu8UU",
  authDomain: "recaller-14a1f.firebaseapp.com",
  databaseURL: "https://recaller-14a1f.firebaseio.com",
  projectId: "recaller-14a1f",
  storageBucket: "recaller-14a1f.appspot.com",
  messagingSenderId: "448806748779"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const storage = firebase.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = () => firebase.auth();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
