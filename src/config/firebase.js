import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUfFsG3sbH7-TLTy0z2lV777JpuvHRcUI",
  authDomain: "hashtag-33eb4.firebaseapp.com",
  projectId: "hashtag-33eb4",
  storageBucket: "hashtag-33eb4.appspot.com",
  messagingSenderId: "252763497085",
  appId: "1:252763497085:web:3b7e257e8a90ee7886c714",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
