// import firebase  from 'firebase/app';
// import 'firebase/auth';

import firebase from "firebase/compat/app"
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAj7m4WfgrvnvwlJ8-U_yi1pkNJ64Jyf0w",
  authDomain: "hgch-b454e.firebaseapp.com",
  projectId: "hgch-b454e",
  storageBucket: "hgch-b454e.appspot.com",
  messagingSenderId: "161701660552",
  appId: "1:161701660552:web:f6ca4c264eda75eb845c3d"
};

firebase.initializeApp(firebaseConfig)

export default firebase.auth()