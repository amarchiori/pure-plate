import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './auth/auth';



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ user, loading, error ] = useAuthState(auth)
  // const [currentUser, setCurrentUser] = useState(null);
  // const value = { currentUser, setCurrentUser };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user);
  //     }
  //     setCurrentUser(user);
  //   });

  //   return unsubscribe;
  // }, []);

  return <UserContext.Provider value={{user, loading, error}}>{children}</UserContext.Provider>;
};