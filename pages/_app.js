import Layout from "@/components/Layout/Layout"
import { UserContextProvider } from "@/utils/UserProvider"
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return(
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  ) 
}
