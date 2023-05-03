import Layout from "@/components/Layout/Layout"
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FavoriteProvider } from "@/contexts/FavoriteContext"
import { UserContextProvider } from "@/contexts/UserProvider"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => { 
    const isProd = process.env.NODE_ENV === "production";
    const handleRouteChange = url => {
      if (isProd) {
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
          page_path: url,
        });
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);


  return(
    <UserContextProvider>
      <FavoriteProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position="top-center"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="colored"/>
        </Layout>
      </FavoriteProvider>
    </UserContextProvider>
  ) 
}
