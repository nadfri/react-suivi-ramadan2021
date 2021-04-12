import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
	apiKey: 'AIzaSyCF9wvDFAdTQqQJ5RhDY3ptxvU2CsqdIEo',
	authDomain: 'suivi-ramadan2021.firebaseapp.com',
	databaseURL: 'https://suivi-ramadan2021-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'suivi-ramadan2021',
	storageBucket: 'suivi-ramadan2021.appspot.com',
	messagingSenderId: '313272985143',
	appId: '1:313272985143:web:5bd637562eecc67cc201b2',
	measurementId: 'G-DM43KY7QMM',
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db   = firebase.firestore();
export default fire;
export {db};
