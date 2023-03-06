import { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db} from '../utils/firebase'
import { UserContext } from '@/contexts/UserProvider';

export default function UserDisplay() {
    const { user } = useContext(UserContext)
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