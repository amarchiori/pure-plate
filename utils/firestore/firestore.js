import { 
    getFirestore,
    collection,
    addDoc,
    where,
    query,
    onSnapshot,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { app} from '../firebase'
import { auth } from '../auth/auth';
import { db } from '../firebase';

export const deleteUserRecipe = async (id) => {
  const db = getFirestore(app);
    await deleteDoc(doc(db, "recipes", id));
    return console.log("deleted:", id)
}

export const useUserRecipes = () => {
  const [user] = useAuthState(auth);
  const [userRecipes, setUserRecipes] = useState([]);
  const recipesRef = collection(db, 'recipes');

  useEffect(() => {
    const q = query(recipesRef, where('addedBy', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedRecipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserRecipes(updatedRecipes);
    });

    return () => unsubscribe();
  }, [recipesRef, user]);

  return userRecipes;
};
  
  
  
  