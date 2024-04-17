'use state'
import Link from "next/link";
import React, { FC, useState } from "react"
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher"
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
}

const Header: FC<Props> = ({ activeItem, setOpen }) => {
    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setActive(true)
            }
            else {
                setActive(false)
            }
        })
    }

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false)
        }
    }

    return (
        <div className='w-full relative'>
            <div className={`${active
                ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
                }`}
            >
                
            </div>
        </div>
    )
}

export default Header 