import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
} from '@/utils/auth/auth';



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
        <div className="md:w-1/2 w-11/12">
            <div className="block p-10 xl:p-32">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-4xl mb-12 text-lightOrange text-center uppercase font-All-Round-Gothic">
                        Create Account
                    </p>
                    <div >
                        <div className="mb-6">
                            <input 
                                type="text"
                                {...register('displayName', {required: true})} 
                                placeholder='Name'
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
                        </div>

                    <div className="mb-6">
                        <input 
                            type="email" 
                            {...register('email', {required: true})}
                            placeholder='Email'
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
                    </div>
                    <div className="mb-6">
                        <input 
                        type="password" 
                        {...register('password', {required: true, minLength: 8})}
                        placeholder='Password'
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
                    </div>
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