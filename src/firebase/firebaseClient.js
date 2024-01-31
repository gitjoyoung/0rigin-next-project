// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { myFirestore } from 'src\firebase\firebaseClient'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyADNLaRkOE5vs-EJvq5w1U425Me7PkThIg',
   authDomain: 'origin-1d7bd.firebaseapp.com',
   projectId: 'origin-1d7bd',
   storageBucket: 'origin-1d7bd.appspot.com',
   messagingSenderId: '624109551404',
   appId: '1:624109551404:web:965b715790e20a0cc4f689',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const originStore = getFirestore(app)
