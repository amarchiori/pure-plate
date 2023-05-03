import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db} from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/auth/auth';

export default function UserDisplay() {
    const [ user ] = useAuthState(auth)
    const [displayName, setDisplayName] = useState(null);
  
    useEffect(() => {
      async function getUserDisplayName() {
        if (!user) {
          return;
        }
  
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const { displayName } = userDocSnapshot.data();
          setDisplayName(displayName);
        }
      }
  
      getUserDisplayName();
    }, [user]);
    
    return (
      <div className='text-black z-10 text-center md:pl-14 bg-white/50 backdrop-blur-sm p-5'>
        <h1 className='text-3xl md:text-4xl'>Welcome, 
          <span className='font-bold block'>{displayName}!</span>
        </h1>
        <p className='text-base pt-2 md:pt-4'>Don&apos;t forget to add your own family recipes</p>
      </div>
    )
  }