import SignIn from "@/components/authpage/signIn"
import SignUp from "@/components/authpage/signUp"
import Head from "next/head"
import Image from "next/image"
import PurePlateHLogo from '../public/images/PurePlateHLogo.png'

const AuthPage = () => {
  return (
    <>
    <Head>
        <title>Pure Plate Auth</title>
    </Head>
        <div className="h-screen overflow-y-auto">
            <div className="h-1/2 relative z-50">
                <Image
                    src={PurePlateHLogo}
                    alt="Pure Plate Horizontal Logo"
                    priority={true}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="px-6 text-gray-700 mb-20">
                <div className="flex justify-center items-center flex-wrap md:h-1/2 h-1/2 divide-solid md:divide-x-2 divide-y-2 md:divide-y-0">
                    <SignIn/>
                    <SignUp/>
                </div>
            </div>
        </div>
    </>
  )
}

export default AuthPage