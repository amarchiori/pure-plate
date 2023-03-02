import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db} from '../utils/firebase'

export default function UserDisplay() {
    const [user] = useAuthState(auth);
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
    
    return <div>Welcome, {displayName}!</div>;
  }