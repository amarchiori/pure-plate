import Layout from "@/components/Layout/Layout"
import { UserProvider } from "@/utils/UserProvider"
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return(
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  ) 
}
