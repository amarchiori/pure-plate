import { 
    getFirestore,
    getDoc,
    doc,
    setDoc,
    collection,
    getDocs,
} from 'firebase/firestore';

import { app} from '../firebase'

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
  