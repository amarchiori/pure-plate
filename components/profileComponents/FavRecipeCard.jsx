import Image from "next/image";
import Link from "next/link";
import { useContext} from "react";
import { FavoriteContext } from "@/contexts/FavoriteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function FavRecipeCard({imageUrl, title, description, id, }) {
    const { clearItemFromFav } = useContext(FavoriteContext);


  return (
    <div className="bg-white border border-gray-100 flex rounded-lg shadow">
        <div className="relative hidden sm:block h-auto w-full">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    fill
                    alt={title}
                    className="object-cover"
                    sizes="(max-width: 60em) 24vw,
                    (max-width: 28em) 45vw,
                    100vw"
                    placeholder="blur"
                    blurDataURL={imageUrl}
                />
            ) : (
                <></>
            )}
        </div>
        <div className="p-5 ">
            <div className="sm:flex sm:flex-col">
                <p className="mb-2 text-xl tracking-wide font-All-Round-Gothic text-gray-900">
                    {title.toUpperCase()}
                </p>
                <p className="mb-3 font-Sabon text-sm text-gray-700">
                    {description}
                </p>
                <div className="flex justify-between">
                    <Link 
                        href="/recipe/[id]" as={`/recipe/${id}`}
                        className="font-Sabon w-max px-3 py-2 text-sm font-medium text-white bg-lightOrange rounded-lg"
                    >
                            Full Recipe
                    </Link>
                        <button 
                            className="w-4"
                            onClick={() => clearItemFromFav(id)}
                        >
                            <FontAwesomeIcon icon={faTrashCan} style={{color: "#afafaf"}}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavRecipeCard