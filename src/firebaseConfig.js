import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAgduidj00ogevnqSDuNXmOvuOM2K9zows",
    authDomain: "surveyapp-cec99.firebaseapp.com",
    projectId: "surveyapp-cec99",
    storageBucket: "surveyapp-cec99.appspot.com",
    messagingSenderId: "709497581380",
    appId: "1:709497581380:web:431ba55ba30dbcdba4f111"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
