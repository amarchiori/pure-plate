import { initializeApp } from 'firebase/app'

import { 
    getFirestore,
    getDoc,
    doc,
    setDoc,
    collection,
    writeBatch,
    getDocs,
} from 'firebase/firestore';

import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'

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


export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);



export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);


export const getCategories = async () => {
  const db = getFirestore(app);
  const categoriesRef = collection(db, 'Categories');

  try{
    const querySnapshot = await getDocs(categoriesRef);
    const categories = querySnapshot.docs.map((doc) => doc.data());

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRecipesByCategory = async (category) => {
  const db = getFirestore(app);
  const recipesRef = collection(db, `Categories/${category}/recipes` );
  
  try{
    const querySnapshot = await getDocs(recipesRef);
    const recipes = querySnapshot.docs.map((doc) => doc.data());
    return recipes;
  } catch (error) {
    console.log(error);
    return [];
  }
  
}


export const AddNewRecipe = async (data) => {
  const db = getFirestore(app);
  await setDoc(doc(db, `Categories/${data.category}/recipes/${data.slug}`), data);
  return console.log(data)
}


export const getIndividualRecipe = async(categoryId, slug) => {
  const db = getFirestore(app);
  const docRef = doc(db, "Categories", categoryId, "recipes", slug);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const IndividualRecipe = docSnap.data()
    return IndividualRecipe;
  } else {
    console.log('No such document')
  }
}


