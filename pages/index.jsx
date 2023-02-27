import { auth, getCategories} from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import UserDisplay from '@/components/UserDisplayName';

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
      <div className="h-2/4 flex overflow-x-scroll">
          {categories && categories.map((category) => (
              <Link 
                href={`/Categories/${category.name}`}
                key={category.name} 
                className='grid grid-col-4 rounded-lg shadow-lg aspect-square font-Sabon place-items-center' 
              >
                  {category.name}
              </Link>
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