import { useContext } from "react";
import { FavoriteContext } from "@/contexts/FavoriteContext";
import { auth, signOutUser } from "@/utils/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
    const [ user ] = useAuthState(auth)
    const { favCount } = useContext(FavoriteContext)

  return (
    <header className="bg-white font-All-Round-Gothic text-lg">
        <nav className="flex justify-around sm:justify-between px-2 sm:px-6 py-3">
            <Link href={'/'}>
                <h1 className="font-bold text-freshGreen">Pure Plate</h1>
            </Link>
            <div className="flex space-x-5">
                {user ? (
                    <>
                        <Link 
                            href={'/add-recipe'}
                            className="hover:scale-125"
                        >
                            ADD RECIPE
                        </Link>
                        <span 
                            onClick={signOutUser}
                            className="hover:scale-125"
                        >
                            SIGN OUT
                        </span>
                    </>
                ) : (
                    <Link 
                        href={'/authentication'}
                        className="hover:scale-125"
                    >
                        SIGN IN
                    </Link>
                )}

                {user ? (
                        <Link className="text-lightOrange hover:animate-pulse hover:scale-125" href={'/profile'}>
                            <FontAwesomeIcon 
                                icon={faHeart}
                        />
                        { favCount ? (
                            <span className="pl-1">
                                {favCount}
                            </span> 
                        ) : (
                            null
                        )
                        }
                        </Link>
                ) : (
                    null
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar