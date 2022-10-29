import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDgtusqnBN1KofZPNlp3nn01cnYBQqrMZg',
  authDomain: 'trash-turn.firebaseapp.com',
  projectId: 'trash-turn',
  storageBucket: 'trash-turn.appspot.com',
  messagingSenderId: '546504597041',
  appId: '1:546504597041:web:3f4ab85655f755796d3f10',
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
