import { auth, signOutUser } from "@/utils/auth/auth";
import { useIdToken } from "react-firebase-hooks/auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [user] = useIdToken(auth)

  return (
    <header className="bg-white border-rosyBrown border-b font-All-Round-Gothic text-xl">
        <nav className="flex justify-between p-6">
            <Link href={'/'}>
                <h1 className="font-bold">Pure Plate</h1>
            </Link>
            <div className="flex space-x-5">
                <Link href={'/add-recipe'}>ADD RECIPE</Link>
                {user ? (
                        <span onClick={signOutUser}>SIGN OUT</span>
                ) : (
                    <Link href={'/authentication'}>SIGN IN</Link>
                )}

                {user ? (
                        <Link className="text-rose-600" href={'/profile'}>
                            <FontAwesomeIcon 
                                icon={faHeart}
                        />
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