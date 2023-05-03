import Link from "next/link";
import Image from "next/image";
import { useContext} from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { FavoriteContext } from "@/contexts/FavoriteContext";
import { auth, signOutUser } from "@/utils/auth/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import plainLogo from '../../public/images/plainLogo.png';


const Navbar = () => {
    const [ user ] = useAuthState(auth)
    const { favCount } = useContext(FavoriteContext)



  return (
    <header className="bg-white font-All-Round-Gothic text-lg z-50">
        <nav className="flex justify-around items-center sm:justify-between px-2 sm:px-6 py-3">
            <div className="flex items-center relative">
                <Image
                    src={plainLogo}
                    alt="PurePlateLogo"
                    height="50"
                    weidth="50"
                />
                <Link href={'/'}>
                    <h1 className="font-bold text-freshGreen pl-2">Pure Plate</h1>
                </Link>
            </div>
            <div className="flex space-x-5 items-center">
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
                        <Link className="w-5 hover:animate-pulse hover:scale-125" href={'/profile'}>
                            <FontAwesomeIcon icon={faHeart} style={{color: "#FF4400",}} />
                        </Link>
                        { favCount ? (
                            <span >
                                {favCount}
                            </span> 
                        ) : (
                            null
                        )
                        }
                    </>
                ) : (
                    <Link 
                        href={'/authentication'}
                        className="hover:scale-125"
                    >
                        SIGN IN
                    </Link>
                )}

                {/* {user ? (
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
                )} */}
            </div>
        </nav>
    </header>
  )
}

export default Navbar