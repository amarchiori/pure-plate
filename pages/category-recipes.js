import { categoriesData } from "@/utils/categoriesData"
import { useEffect, useState } from "react"
import RecipeCard from "@/components/home/recipeCard";
import { db } from '@/utils/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function CategoryRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'recipes'), snapshot => {
          const allRecipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setRecipes(allRecipes);
        })
        return () => {
          unsubscribe();
        };
      }, []);

    const handleCategoryChange = categoryName => {
        setSelectedCategory(categoryName);
      };
    
    const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.category === selectedCategory)
    : recipes;


  return (
    <div className="h-screen overflow-y-scroll">
        <div className='flex flex-nowrap justify-center items-center gap-5 py-10'>
            <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
            <p className='font-All-Round-Gothic text-4xl text-center'>
            {selectedCategory ? `${selectedCategory}` : 'All Recipes'}
            </p>
            <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
        </div>
        <div className="flex flex-wrap justify-around m-auto pb-10">
            <h1 
                className="p-2 text-rosyBrown font-semi-bold tracking-wide"
                onClick={() => setSelectedCategory(null)}>
                All Recipes
            </h1>
            {categoriesData && categoriesData.map((category) => (
                <div 
                    key={category.name} 
                    className="p-2 text-rosyBrown font-semi-bold tracking-wide"
                    onClick={() => handleCategoryChange(category.name)}
                >
                    <h1 className={`${selectedCategory === category.name ? 'text-black border-b-2 border-rosyBrown' : ''}`}>
                        {category.name}
                    </h1>
                </div>
            ))}
        </div>
        <div className='flex flex-wrap gap-1 py-5 bg-gray-50'>
            {filteredRecipes.map((recipe) => (
                <RecipeCard 
                key={recipe.id}
                imageUrl={recipe.imageUrl}
                title={recipe.title}
                description={recipe.description}
                ID={recipe.id}
                cookTime={recipe.cookTime}
                />
            ))}
        </div>
    </div>
  )
}

export default CategoryRecipes