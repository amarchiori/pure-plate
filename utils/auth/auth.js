import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import { db, app} from '../firebase'

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);


export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };
  
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
export const signOutUser = async () => await signOut(auth);
  
export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);