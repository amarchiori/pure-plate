import { FavoriteContext } from "@/contexts/FavoriteContext";
import { UserContext } from "@/contexts/UserProvider";
import { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";

const Profile = () => {
    const { user } = useContext(UserContext)
    const { clearItemFromFav, favItems, favCount} = useContext(FavoriteContext);

    return (
        <>
            <div className="mx-auto max-w-7xl px-6 xl:px-8 pt-6 h-screen mb-10">
                <h1 className="font-All-Round-Gothic font-bold text-center text-3xl mb-10">
                    {user?.displayName} 
                </h1>
                <h2 className="text-center text-lg text-lightOrange">
                    {favCount === 1 ? `${favCount} favorite recipe in your cookbook` : `${favCount} favorite recipes in your cookbook`} 
                </h2>
                <div className="mx-auto mt-10 grid w-full md:max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {favItems && favItems.length ? (
                    favItems.map((favItem) => (
                        <div key={favItem.title}  className="bg-white border border-gray-100 flex rounded-lg shadow">
                            <div className="relative hidden sm:block h-auto w-11/12">
                            <Image 
                                src={favItem.imageUrl}
                                alt={favItem.imageUrl}
                                fill
                                sizes="50vw"
                                className="object-cover overflow-hidden"
                            />
                            </div>
                            <div className="p-5 ">
                                <div className="sm:flex sm:flex-col">
                                    <p className="mb-2 text-xl tracking-wide font-All-Round-Gothic text-gray-900">
                                    {favItem.title.toUpperCase()}
                                    </p>
                                    <p className="mb-3 font-Sabon text-sm text-gray-700">
                                    {favItem.description}
                                    </p>
                                    <div className="flex justify-between">
                                        <Link href="/Categories/[category]/[slug]" as={`/Categories/${favItem.category}/${favItem.slug}`}
                                            className="font-Sabon w-max px-3 py-2 text-sm font-medium text-white bg-lightOrange rounded-lg"
                                        >
                                        Full Recipe
                                        </Link>
                                        <button 
                                            className="text-black"
                                            onClick={() => clearItemFromFav(favItem)}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>You have no favorite recipes</h2>
                )}
                </div>
                
            </div>
        </>
    )
}

export default Profile