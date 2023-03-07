import { useRouter } from "next/router";
import { getIndividualRecipe } from "@/utils/firestore/firestore";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { FavoriteContext } from "@/contexts/FavoriteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../../utils/auth/auth'

function IndividualRecipe({ recipeData }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { category, slug } = router.query;
  const { addItemToFav } = useContext(FavoriteContext);

  const addRecipeToFav = () => addItemToFav(recipeData);

  return (
  <>
    <div className="mx-auto px-6 lg:px-10 pt-10 md:pt-20 font-Sabon">
        <div className="flex justify-center items-center flex-wrap">

          <div className="h-full sm:h-[50vh] sm:flex mb-10 w-full">
            <div className="md:w-6/12 mb-10 w-full h-full bg-softGrey/60 p-6 lg:p-8 text-center flex flex-col justify-around">
              { user ? (
                <button onClick={addRecipeToFav}>
                <FontAwesomeIcon 
                  icon={faHeartCirclePlus}
                  className="text-lightOrange" 
                />
              </button>
              ) : (
                null
              )}
              <h2 className="text-xl font-bold font-All-Round-Gothic text-gray-900 md:text-3xl">
                {recipeData.title}
              </h2>
              <h3 className="my-3">
                {recipeData.description}
              </h3>
              <div className="my-5 sm:my-0 flex justify-around">
                <div>
                  <h3 className="font-semibold ">
                    Serving Size
                  </h3>
                  {recipeData?.servingSize}
                </div>
                <div>
                  <h3 className="font-semibold">
                    Cook Time
                  </h3>
                  {recipeData?.cookTime}
                </div>
              </div>
            </div>

            <div className="md:w-6/12 w-full p-6 lg:p-8 relative">
              {recipeData.imageUrl? (
                <Image 
                src={recipeData.imageUrl} 
                alt={recipeData.imageUrl} 
                fill
                quality={50}
                sizes="(min-width: 60em) 24vw,
                (min-width: 28em) 45vw,
                  100vw"
              />
              ): (
                <Image 
                src={category.imageUrl} 
                alt={category.imageUrl} 
                fill
                quality={50}
                className="overflow-hidden object-cover"
                sizes="(min-width: 60em) 24vw,
                (min-width: 28em) 45vw,
                  100vw"
              />
              )}
              
            </div>
          </div>

          <div className="h-full sm:flex leading-relaxed">
            <div className="md:w-6/12 mb-10 w-full p-6 lg:p-8 border-freshGreen/70 border-r-2">
              <h3 className="sm:text-right">
                <span className="font-All-Round-Gothic font-bold">
                  Ingredients:
                </span>
                {recipeData?.ingredients?.map((ing, index) => (
                    <div key={index}>
                      <span className="font-semibold">{ing.amount} </span>{ing.name}
                    </div>
                ))}
              </h3>
            </div>
            <div className="md:w-6/12 mb-10 w-full p-6 lg:p-8">
              <h3>
                  {recipeData?.steps?.map((step, index) => (
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

export async function getServerSideProps(context) {
  const { params } = context;
  const { category, slug} = params;

  const recipeData = await getIndividualRecipe(category, slug)

  return{
    props: {
      recipeData
    }
  }
}

export default IndividualRecipe

