import { SessionProvider } from "next-auth/react"
import NavbarAuth from "./NavbarAuth"
import NavbarLogo from "./NavbarLogo"
import NavbarMenu from "./NavbarMenu"
import SearchArticle from "./SearchArticle"

const Navbar = () => {
  return (
    <div className="flex h-18 gap-5 shadow-sm bg-[tomato]/5 items-center">
        <NavbarLogo></NavbarLogo>

        <NavbarMenu></NavbarMenu>

        <div className="ml-auto flex justify-center items-center gap-4">
          <SessionProvider>
            <SearchArticle></SearchArticle>
          </SessionProvider>

          <SessionProvider>
            <NavbarAuth></NavbarAuth>
          </SessionProvider>
        </div>
    </div>
  )
}

export default Navbar
