import { auth, getCategories } from '../utils/firebase';
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
      <div className="flex font-All-Round-Gothic flex-col text-5xl items-center justify-center h-2/4">
        {
          user ? (
            <UserDisplay className="font-normal"/>
          ) : (
            <h1> 
            Welcome to <span className='font-bold'>Pure Plate</span>
          </h1> 
        )}
      </div>
      <div className="h-2/4 flex overflow-x-scroll space-x-5 ">
          {categories && categories.map((category) => (
            <div 
              key={category.name} 
              className='grid grid-col-4 relative aspect-square font-Sabon place-items-center mb-10'>
             <Image 
                  src={category.imageUrl} 
                  alt={category.imageUrl} 
                  fill
                  className="overflow-hidden rounded-full object-cover"
                  sizes="50vw">
                  </Image>
              <div className='absolute inset-0 flex flex-col justify-center items-center text-white font-bold'>
                <Link 
                  className='text-bold text-2xl bg-slate-300 bg-opacity-40 rounded-md p-2 hover:bg-opacity-60'
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

export async function getServerSideProps() {
  const categories = await getCategories();


  return {
    props: {
      categories,
    },
  };
}


export default (Home)