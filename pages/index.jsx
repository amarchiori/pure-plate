import { getCategories } from '@/utils/firestore/firestore';
import { auth } from '@/utils/auth/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import UserDisplay from '@/components/UserDisplayName';
import Image from 'next/image';

const Home = ({ categories }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>
  }
  
  if(error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="h-screen">
      <div className="flex font-All-Round-Gothic flex-col text-xl sm:text-4xl items-center justify-center h-2/5 ">
        {
          user ? (
            <UserDisplay className="font-normal"/>
          ) : (
            <h1> 
            Welcome to <span className='font-bold'>Pure Plate</span>
          </h1> 
        )}
      </div>
      <div className="h-2/5 pl-3 flex overflow-x-auto space-x-5 snap-x">
          {categories && categories.map((category) => (
            <div 
              key={category.name} 
              className='snap-center relative aspect-square font-Sabon place-items-center mb-10'>
             <Image 
                  src={category.imageUrl} 
                  alt={category.imageUrl} 
                  fill
                  className="overflow-hidden rounded-full shadow-lg object-cover"
                  quality={50}
                  sizes="(min-width: 60em) 24vw,
                        (min-width: 28em) 45vw,
                          100vw">
                </Image>
              <div className='absolute inset-0 flex flex-col justify-center items-center text-white font-bold'>
                <Link 
                  className='text-bold text-2xl bg-slate-500 bg-opacity-40 rounded-md p-2 hover:bg-opacity-60'
                  href={`/Categories/${category.name}`}> 
                  {category.name}
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const categories = await getCategories();


  return {
    props: {
      categories,
    },
  };
}


export default (Home)