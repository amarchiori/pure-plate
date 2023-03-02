import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage,} from 'firebase/storage'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAMDRNTEoytUmVxSnbb3E-nOQ8imdNv5YY",
  authDomain: "recipe-app-4bee7.firebaseapp.com",
  projectId: "recipe-app-4bee7",
  storageBucket: "recipe-app-4bee7.appspot.com",
  messagingSenderId: "569317589589",
  appId: "1:569317589589:web:3926df1b49d0fdb9780adc"
}

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app, "gs://recipe-app-4bee7.appspot.com")

export const db = getFirestore(app);