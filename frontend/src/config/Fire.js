import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDd7on0XRSIzYikp_-3iAFS945V-TEr6g8",
  authDomain: "react-socket-chat.firebaseapp.com",
  databaseURL: "https://react-socket-chat.firebaseio.com",
  projectId: "react-socket-chat",
  storageBucket: "react-socket-chat.appspot.com",
  messagingSenderId: "710241986387",
  appId: "1:710241986387:web:763d473c1d7dbee79823a6",
  measurementId: "G-J6BM1DFLWY"
};

const fire = firebase.initializeApp(config);
export default fire;
