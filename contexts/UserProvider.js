import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/auth/auth';
import LoadingAnimation from '@/components/Layout/loadingAnimation';



export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [ user, loading, error ] = useAuthState(auth)

  if (loading) {
    return <LoadingAnimation/>
  }

  return <UserContext.Provider value={{user, loading, error}}>{children}</UserContext.Provider>;
};