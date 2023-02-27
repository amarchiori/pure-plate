import Link from "next/link"

function Footer() {
  return (
    <footer className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 bg-black">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Alessandra Marchiori</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <Link href="#" className="mr-4 hover:underline md:mr-6 ">About</Link>
            </li>
            <li>
                <Link href="#" className="hover:underline">Contact</Link>
            </li>
        </ul>
    </footer>
  )
}

export default Footer