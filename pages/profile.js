import { FavoriteContext } from "@/contexts/FavoriteContext";
import { UserContext } from "@/contexts/UserProvider";
import { useContext} from "react";
import withAuth from '../utils/withAuth'
import FavRecipeCard from "@/components/profileComponents/FavRecipeCard";
import UserRecipeCard from "@/components/profileComponents/UserRecipeCard"
import { useUserRecipes } from "@/utils/firestore/firestore";

const Profile = () => {
    const { user } = useContext(UserContext)
    const { favItems, favCount } = useContext(FavoriteContext);

    const userRecipes = useUserRecipes();

    return (
        <>
            <div className="mx-auto max-w-7xl px-6 xl:px-8 pt-6 h-screen mb-10 overflow-y-scroll">
                <h1 className="font-All-Round-Gothic font-bold text-center text-3xl mb-10">
                    {user?.displayName} 
                </h1>

                <div className='flex flex-nowrap justify-center items-center gap-5 py-10'>
                    <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
                        <p className='font-All-Round-Gothic text-xl text-center text-lightOrange'>
                        {favCount === 1 ? `${favCount} favorite recipe in your cookbook` : `${favCount} favorite recipes in your cookbook`} 
                        </p>
                    <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
                </div>

                <div className="mx-auto mt-10 grid w-full md:max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:max-w-none lg:grid-cols-2">
                {favItems && favItems.length ? (
                    favItems.map((favItem) => (
                        <FavRecipeCard 
                            key={favItem.id}
                            imageUrl={favItem.imageUrl}
                            title={favItem.title}
                            description={favItem.description}
                            id={favItem.id}
                        />
                    ))
                ) : (
                    <h2>You have no favorite recipes</h2>
                )}
                </div>

                <div className='flex flex-nowrap justify-center items-center gap-5 py-10'>
                    <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
                        <p className='font-All-Round-Gothic text-xl text-center text-freshGreen'>
                            Your Recipes
                        </p>
                    <hr className='border-grey-400 h-px w-2/6 flex-shrink'/>
                </div>

                <div className="mx-auto mt-10 grid w-full md:max-w-2xl grid-cols-1 gap-y-16 gap-x-8  lg:max-w-none lg:grid-cols-2">
                {userRecipes && userRecipes.length ? (
                    userRecipes.map((userRecipe) => (
                        <UserRecipeCard 
                            key={userRecipe.id}
                            recipe={userRecipe}
                        />
                    ))
                ) : (
                    <h2>Add a recipe!</h2>
                )}
                </div>
            </div>
        </>
    )
}

export default withAuth(Profile)