import Image from "next/image";
import  { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { deleteUserRecipe } from "@/utils/firestore/firestore";
import RecipeUpdateForm from "./updateForm";

function UserRecipeCard({ recipe }) {
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const toggleShowUpdateForm = () => {
      setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
    };

    return (
        <>
        <div className="bg-white border border-gray-100 flex rounded-lg shadow">
            <div className="relative hidden sm:block h-auto w-5/12">
            {recipe.imageUrl ? (
                <Image
                    src={recipe.imageUrl}
                    fill
                    alt={recipe.title}
                    className="object-cover"
                    sizes="(max-width: 60em) 24vw,
                    (max-width: 28em) 45vw,
                    100vw"
                    placeholder="blur"
                    blurDataURL={recipe.imageUrl}
                />
            ) : (
                <></>
            )}
            </div>
            <div className="p-5 w-full">
                <div className="sm:flex sm:flex-col">
                    <p className="mb-2 text-xl tracking-wide font-All-Round-Gothic text-gray-900">
                        {recipe.title.toUpperCase()}
                    </p>
                    <p className="mb-3 font-Sabon text-sm text-gray-700">
                        {recipe.description}
                    </p>
                    <div className="flex justify-between">
                        <button
                            onClick={toggleShowUpdateForm}
                            className="font-Sabon w-max px-3 py-2 text-sm font-medium text-white bg-freshGreen rounded-lg"
                        >
                            Update
                        </button>
                        <button 
                            className="w-4"
                            onClick={() => deleteUserRecipe(recipe.id)}
                        >
                            <FontAwesomeIcon icon={faTrashCan} style={{color: "#afafaf"}}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {showUpdateForm && <RecipeUpdateForm recipe={recipe} closeUpdateForm={toggleShowUpdateForm}/>}
        </>
      )
    }

export default UserRecipeCard