import { auth } from '@/utils/auth/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {categoriesData} from '@/utils/categoriesData'
import UserDisplay from '@/components/UserDisplayName';
import LoadingAnimation from '@/components/Layout/loadingAnimation';

import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Category from '@/components/home/categoriesCard';
import RecipeCard from '@/components/home/recipeCard';
import {  useRouter } from 'next/router';
import lemonsBG from '../public/images/lemonLeaves.jpg'
import Image from 'next/image';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'recipes'), snapshot => {
      const allRecipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(allRecipes);
    })

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <LoadingAnimation/>
  }
  
  if(error) {
    return <p>Error: {error.message}</p>;
  }

  const handleCategoryClick = () => {
    router.push("/category-recipes")
  };


  return (
    <div className="overflow-y-scroll">
      <div className="relative flex font-All-Round-Gothic flex-col md:flex-row items-center justify-center md:justify-start h-[800px] mb-10 md:mb-20">
        <div className='absolute inset-0'>
          <Image
            src={lemonsBG}
            alt='lemon leaves bg'
            fill
            className='object-cover saturate-125 z-0'
            priority={true}
          />
        </div>
        {
          user ? (
            <UserDisplay />
          ) : (
            <div className='text-black z-10 text-center md:pl-14 bg-white/50 backdrop-blur-sm p-5'>
              <h1 className='text-3xl md:text-5xl'> 
                Welcome to 
                <span className='font-bold block'> Pure Plate</span> 
              </h1>
              <h2 className="text-base pt-2 md:pt-4">
                Pure Goodness
              </h2>
            </div> 
        )}
      </div>

      <div className='flex flex-nowrap justify-center items-center gap-5 py-10'>
        <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
        <p className='font-All-Round-Gothic text-4xl text-center'>
          Categories
        </p>
        <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
      </div>

      <div className="h-2/5 flex flex-wrap gap-5 w-full">
          {categoriesData && categoriesData.map((category) => (
            <Category
              key={category.name}
              category={category.name}
              onClick={handleCategoryClick}
              imageUrl={category.imageUrl}
            />
          ))}
      </div>

      <div className='flex flex-nowrap justify-center items-center gap-5 py-10'>
        <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
        <p className='font-All-Round-Gothic text-4xl text-center'>
          All Recipes
        </p>
        <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
      </div>

      <div className='flex flex-wrap h-full gap-5'>
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id}
          imageUrl={recipe.imageUrl}
          title={recipe.title}
          description={recipe.description}
          ID={recipe.id}
          time={recipe.cookTime}
        />
      ))}
      </div>
    </div>
  )
}

// export async function getStaticProps() {
//   const recipes = await getAllRecipes();


//   return {
//     props: {
//       recipes,
//     },
//   };
// }


export default (Home)