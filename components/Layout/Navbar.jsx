import { auth, signOutUser } from "@/utils/firebase";
import { useIdToken } from "react-firebase-hooks/auth";
import Link from "next/link";

const Navbar = () => {
    const [user] = useIdToken(auth)

  return (
    <header className="bg-white font-All-Round-Gothic text-xl mt-4">
        <nav className="flex justify-between p-6">
            <Link href={'/'}>
                <h1 className="font-bold">Pure Plate</h1>
            </Link>
            <div className="flex space-x-5">
                <Link href={'/add-recipe'}>ADD RECIPE</Link>
                {user ? (
                        <span onClick={signOutUser}>SIGN OUT</span>
                ) : (
                    <Link href={'/sign-in'}>SIGN IN</Link>
                )

                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar