import SignIn from "@/components/signIn";
import Head from "next/head";

const SignInPage = () => {
    return (
        <>
            <Head>
                <title>Sign In Page</title>
            </Head>
            <div className="font-Sabon">
                <SignIn/>
            </div>
        </>
    )
}

export default SignInPage;