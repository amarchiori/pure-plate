import Layout from "@/components/Layout/Layout"
import { FavoriteProvider } from "@/contexts/FavoriteContext"
import { UserContextProvider } from "@/contexts/UserProvider"
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return(
    <UserContextProvider>
      <FavoriteProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FavoriteProvider>
    </UserContextProvider>
  ) 
}
