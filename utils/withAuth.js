import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth } from './auth/auth';

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      router.replace('/');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;



