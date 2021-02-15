import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCPeMQLksK_qCUvVRjFrr7V-J2vQSh-f7k",
  authDomain: "interactive-map-2887f.firebaseapp.com",
  databaseURL: "https://interactive-map-2887f-default-rtdb.firebaseio.com",
  projectId: "interactive-map-2887f",
  storageBucket: "interactive-map-2887f.appspot.com",
  messagingSenderId: "328562993629",
  appId: "1:328562993629:web:2081e4d849b83bd764ae34",
  measurementId: "G-F4HSMQBCPE"
};

const fire = firebase.initializeApp(config);
export default fire;