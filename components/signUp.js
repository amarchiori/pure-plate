import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
} from '@/utils/auth/auth';
import Link from 'next/link';


const SignUp = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
        defaultValues: {
            displayName: '',
            email: '',
            password:'',
        }
    });
  
    const onSubmit = async ({email, password, displayName}) => {
        try { 
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName} );
            router.push('/')
            return console.log('sign up success', user.displayName)
        } catch (error) {
            console.log('user creation encountered an error', error);
        }
    }


    return (
        <>
        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-White b">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div >
                        <div className="mb-6">
                            <label>
                                Name
                            <input 
                                type="text"
                                {...register('displayName', {required: true})} 
                                className="form-input
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-youngYellow focus:outline-none"
                            />
                            {errors.displayName && <span>This field is required</span>}
                            </label>
                        </div>

                    <div className="mb-6">
                        <label>
                            Email
                        <input 
                            type="email" 
                            {...register('email', {required: true})}
                                className="block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-youngYellow focus:outline-none"
                        />
                            {errors.email && <span>This field is required</span>}
                        </label>
                    </div>
                    <div className="mb-6">
                        <label>
                            Password
                        <input 
                        type="password" 
                        {...register('password', {required: true, minLength: 8})}
                            className=" block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-youngYellow focus:outline-none"
                        />
                        {errors.password && <span>This field is required and must be at least 8 characters long</span>}
                        </label>
                    </div>
                    {/* <div className="form-group form-check text-center mb-6">
                        <input type="checkbox"
                            className="form-check-input text-earth appearance-none h-4 w-4 border active:bg-earth border-earth rounded-sm bg-white checked:bg-earth checked:border-earth focus:outline-none focus:ring-earth transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer hover:bg-earth"
                            defaultChecked
                        />
                        <label className="form-check-label inline-block text-gray-800">Subscribe to our newsletter</label>
                    </div> */}
                    <button 
                        type="submit"
                        disabled={isSubmitting} 
                            className="
                            font-All-Round-Gothic
                            w-full
                            px-6
                            py-2.5
                            bg-freshGreen
                            text-white
                            tracking-wider
                            uppercase
                            rounded
                            shadow-md
                            hover:bg-youngYellow hover:shadow-lg
                            focus:bg-youngYellow focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-youngYellow active:shadow-lg
                            transition
                            duration-150
                            ease-in-out">
                        {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default SignUp;