import SignIn from "@/components/signIn"
import SignUp from "@/components/signUp"
import Head from "next/head"

const AuthPage = () => {
  return (
    <>
    <Head>
        <title>Authentication Page</title>
    </Head>
        <div className="h-screen">
            <div className="px-6 h-full text-gray-700">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <SignIn/>
                    <SignUp/>
                </div>
            </div>
        </div>
    </>
  )
}

export default AuthPage