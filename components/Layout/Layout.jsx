import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect } from "react";
import { useRouter } from "next/router";


function Layout({children}) {

  return (
    <>
        <Navbar />
        <main>{children}</main>
        <Footer/>
    </>
  )
}

export default Layout