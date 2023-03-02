import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import cookingTogether from '../public/undraw_cooking.svg';
import { signInWithGooglePopup, auth } from '@/utils/auth/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        router.push('/')
      };

    const signInWIthForm = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(auth.currentUser.displayName);
            router.push('/')
        } catch (error) {
            console.log('user sign in failed', error)
        }
    };

  return (
    <div className="h-screen">
        <div className="h-full text-gray-700">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                    <Image
                        src={cookingTogether}
                        className="w-full"
                        alt="cooking image"
                        width={50}
                        height={50}
                        priority
                    />
                </div>
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-White b">
                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            signInWIthForm();
                        }}>
                            <p className="text-lg mb-3 text-earth text-center">
                                Sign In With
                            </p>
                            <div className="flex flex-row items-center justify-center ">
                                <a>
                                <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    className="inline-block p-2 bg-lightOrange text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-youngYellow hover:shadow-lg focus:bg-youngYellow focus:shadow-lg focus:outline-none focus:ring-0 active:bg-youngYellow active:shadow-lg transition duration-150 ease-in-out mx-1"
                                >
                                {/* <!-- Facebook --> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-6 h-6">
                                    <path 
                                        fill='currentColor'
                                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                                </svg>
                                </button>
                                </a>

                                <a onClick={signInWithGoogle}>
                                <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    className="inline-block p-2 bg-lightOrange text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-youngYellow hover:shadow-lg focus:bg-youngYellow focus:shadow-lg focus:outline-none focus:ring-0 active:bg-youngYellow active:shadow-lg transition duration-150 ease-in-out mx-1"
                                >
                                {/* <!-- Google --> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-6 h-6">
                                    <path 
                                        fill='currentColor'
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                                </svg>
                                </button>
                                </a>

                                <a>
                                <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    className="inline-block p-2 bg-lightOrange text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-youngYellow hover:shadow-lg focus:bg-youngYellow focus:shadow-lg focus:outline-none focus:ring-0 active:bg-youngYellow active:shadow-lg transition duration-150 ease-in-out mx-1"
                                >
                                    {/* <!-- GitHub --> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-6 h-6">
                                        <path 
                                            fill='currentColor'
                                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                                    </svg>
                                </button>
                                </a>
                            </div>

                            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold mx-4 mb-0">
                                    Or
                                </p>
                            </div>

                            {/* <!-- Email input --> */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-youngYellow focus:outline-none"
                                    placeholder="Email address"
                                    name='email'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="mb-6">
                                <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-youngYellow focus:outline-none"
                                placeholder="Password"
                                name='password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            <div className="text-center lg:text-left">
                            <button type="submit" className="
                                w-full
                                px-6
                                py-2.5
                                bg-freshGreen
                                text-white
                                font-medium
                                text-xs
                                leading-tight
                                uppercase
                                rounded
                                shadow-md
                                hover:bg-youngYellow hover:shadow-lg
                                focus:bg-youngYellow focus:shadow-lg focus:outline-none focus:ring-0
                                active:bg-youngYellow active:shadow-lg
                                transition
                                duration-150
                                ease-in-out">
                                    Login
                                </button>
                            </div>
                        </form>
                        <p className="text-xs font-light mt-2 pt-1 mb-0">
                                    Don&#39;t have an account?
                                
                                <Link 
                                    href="/sign-up"
                                    className="text-earth hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                    > 
                                        Register
                                </Link>
                                </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SignIn;