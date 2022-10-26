import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDgtusqnBN1KofZPNlp3nn01cnYBQqrMZg',
  authDomain: 'trash-turn.firebaseapp.com',
  projectId: 'trash-turn',
  storageBucket: 'trash-turn.appspot.com',
  messagingSenderId: '546504597041',
  appId: '1:546504597041:web:3f4ab85655f755796d3f10',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
