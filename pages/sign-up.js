import Head from "next/head";
import SignUp from "@/components/signUp";

const SignUpPage = () => {
    return (
        <>
            <Head>
                <title>Sign Up Page</title>
            </Head>
            <div className="mr-10 font-Sabon">
                <SignUp/>
            </div>
        </>
    )
}

export default SignUpPage;