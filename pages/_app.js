import Layout from "@/components/Layout/Layout"
import { FavoriteProvider } from "@/contexts/FavoriteContext"
import { UserContextProvider } from "@/contexts/UserProvider"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
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
