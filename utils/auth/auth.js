import { db, app} from '../firebase'
import {doc, setDoc, getDoc} from 'firebase/firestore'
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signOut,
    GithubAuthProvider,
} from 'firebase/auth';


export const auth = getAuth(app);


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGooglePopup = async () => {
        const credentials = await signInWithPopup(auth, googleProvider);
        const displayName = credentials.user.displayName
        await createUserDocumentFromAuth(credentials.user, {displayName});
        return  console.log(credentials);
}

export const signInWithGitHubPopup = async () => {
        const credentials = await signInWithPopup(auth, githubProvider);
        const displayName = credentials.user.displayName
        await createUserDocumentFromAuth(credentials.user, {displayName});
        return  console.log(credentials);
}



export const createUserDocumentFromAuth = async (
    user,
    additionalInformation = {}
  ) => {
    if (!user) return;
  
    const userDocRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = user;
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
  