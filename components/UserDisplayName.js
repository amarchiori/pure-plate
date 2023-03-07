import { useState, useEffect, useContext } from 'react';
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
    
    return <div className='text-center'>Welcome, <br/> {displayName}!</div>;
  }