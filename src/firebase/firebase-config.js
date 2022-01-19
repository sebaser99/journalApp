import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCN7Aw5NPlvxajl8hDYG7Z4HQglnY0cLhM",
    authDomain: "journal-app-aff4e.firebaseapp.com",
    projectId: "journal-app-aff4e",
    storageBucket: "journal-app-aff4e.appspot.com",
    messagingSenderId: "924383687245",
    appId: "1:924383687245:web:2597b544c12c96da476204",
    measurementId: "G-N3JQLPWDG5"
  };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
 

 export {
     auth
 }