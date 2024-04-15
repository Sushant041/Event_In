"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import menu from "@/public/assets/icons/menu.svg"
import Image from "next/image"
import logo from "@/public/assets/images/logo-no-background.svg"
import { Separator } from "@radix-ui/react-separator"
import NavItems from "./NavItems"

const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <Image src={menu}
                    alt="menu" 
                    width={24} 
                    height={24}
                    className="cursor-pointer"
                     />
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
                    <Image
                        src={logo}
                        alt="logo"
                        width={128}
                        height={38}
                        />
                    <Separator className="border border-gray-100" />
                    <NavItems />
                </SheetContent>
            </Sheet>

        </nav>
    )
}

export default MobileNav