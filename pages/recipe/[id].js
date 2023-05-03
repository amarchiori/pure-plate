import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc } from 'firebase/firestore'

import { auth } from "@/utils/auth/auth";
import { db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FavoriteContext } from '../../contexts/FavoriteContext'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";

function IndRecipe() {
    const [user] = useAuthState(auth);
    const [recipe, setRecipe] = useState(null);
    const { addItemToFav } = useContext(FavoriteContext);
    const router = useRouter();
    const recipeID = router.query.id

    useEffect(() => {
      const fetchRecipe = async () => {
        const recipeDoc = doc(db, 'recipes', recipeID);
        const recipeSnapshot = await getDoc(recipeDoc);
        if (recipeSnapshot.exists()) {
          const recipeData = recipeSnapshot.data();
          setRecipe({ id: recipeSnapshot.id, ...recipeData });
        }
      };
      fetchRecipe();
    }, [recipeID]);

    if (!recipe) {
      return <div>Loading...</div>;
    }
  
    const addRecipeToFav = () => addItemToFav(recipe);
  
    return (
    <>       
      <h3 className="text-sm text-spaceCadet/60 pl-10 tracking-wider">
        <Link href="/category-recipes">Recipes / </Link>{recipe?.title}
      </h3>
      <div className="mx-auto px-6 lg:px-10 pt-10 md:pt-20 font-Sabon">

          <div className="flex justify-center items-center flex-wrap">
  
            <div className="h-full sm:h-[50vh] sm:flex mb-10 w-full">
              <div className="md:w-6/12 mb-10 w-full h-full bg-youngYellow/50 p-6 lg:p-8 text-center flex flex-col justify-around">
                { user ? (
                  <button onClick={addRecipeToFav} >
                    <FontAwesomeIcon 
                      icon={faHeartCirclePlus}
                      className="text-lightOrange w-6" 
                    />
                  </button>
                ) : (
                  null
                )}
                <h2 className="text-xl font-bold font-All-Round-Gothic text-gray-900 md:text-3xl">
                  {recipe?.title}
                </h2>
                <h3 className="my-3">
                  {recipe?.description}
                </h3>
                <div className="my-5 sm:my-0 flex justify-around">
                  <div>
                    <h3 className="font-semibold ">
                      Serving Size
                    </h3>
                    {recipe?.servingSize}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Cook Time
                    </h3>
                    {recipe?.cookTime}
                  </div>
                </div>
              </div>
  
              <div className="md:w-6/12 w-full p-6 lg:p-8 relative">
                {recipe?.imageUrl? (
                  <Image 
                  src={recipe.imageUrl} 
                  alt={recipe.imageUrl} 
                  fill
                  quality={50}
                  sizes="(min-width: 60em) 24vw,
                  (min-width: 28em) 45vw,
                    100vw"
                  className="object-cover"
                  priority
                  blurDataURL={recipe.imageUrl}
                />
                ): (
                  <div></div>
                )}
                
              </div>
            </div>
  
            <div className="h-full sm:flex leading-relaxed">
              <div className="md:w-6/12 mb-10 w-full p-6 lg:p-8 border-freshGreen/70 border-r-2">
                <h3 className="sm:text-right">
                  <span className="font-All-Round-Gothic font-bold">
                    Ingredients:
                  </span>
                  {recipe?.ingredients?.map((ing, index) => (
                      <div key={index}>
                        <span className="font-semibold">{ing.amount} </span>{ing.name}
                      </div>
                  ))}
                </h3>
              </div>
              <div className="md:w-6/12 mb-10 w-full p-6 lg:p-8">
                <h3>
                    {recipe?.steps?.map((step, index) => (
                        <div key={index} className="mb-4">
                          <span className="font-All-Round-Gothic font-bold">{index ? `Step ${index}:` : 'Prep:'}</span>
                          <p >{step.value}</p>
                        </div>
                    ))}
                </h3>
              </div>
            </div>
  
          </div>
      </div>
    </>
    );
  };
  
  
  export default IndRecipe