import { SessionProvider } from "next-auth/react"
import NavbarAuth from "./NavbarAuth"
import NavbarLogo from "./NavbarLogo"
import NavbarMenu from "./NavbarMenu"

const Navbar = () => {
  return (
    <div className="flex h-18 gap-5 shadow-sm bg-[tomato]/5 items-center">
        <NavbarLogo></NavbarLogo>

        <NavbarMenu></NavbarMenu>

        <SessionProvider>
          <NavbarAuth></NavbarAuth>
        </SessionProvider>
    </div>
  )
}

export default Navbar
