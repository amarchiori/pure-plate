import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './auth/auth';



export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [ user, loading, error ] = useAuthState(auth)

  return <UserContext.Provider value={{user, loading, error}}>{children}</UserContext.Provider>;
};