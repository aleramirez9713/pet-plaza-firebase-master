import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./conection";

firebase.initializeApp(firebaseConfig);
const firestoreFieldValue = firebase.firestore.FieldValue;
const firestoreDB = firebase.firestore();
const firebaseStorage = firebase.storage();
const firebaseAppAuth = (username, password) =>
  firebase.auth().signInWithEmailAndPassword(username, password);
const firebaseAppCreateUser = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);
const firebaseAuthToken = () => firebase.auth().currentUser.getIdToken(true);
const firebaseAppSingOut = () => firebase.auth().signOut();
const firebaseAppListener = (funct) =>
  firebase.auth().onAuthStateChanged(funct);

const auth = firebase.auth();

export {
  firebaseAppAuth,
  firestoreFieldValue,
  firebaseAppCreateUser,
  firebaseAppSingOut,
  firebaseAppListener,
  firestoreDB,
  firebaseStorage,
  firebaseAuthToken,
  auth,
};
