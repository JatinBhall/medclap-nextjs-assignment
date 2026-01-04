"use client"

import Link from "next/link";
import HomeIcon from "./icons/homeIcon";
import FileTextIcon from "./icons/fileTextIcon";
import NavLinkItem from "./navbar/navLinkItem";
import { useState } from "react";

export function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className=" bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-start md:items-center md:justify-between md:h-16">
                    <div className="flex items-center justify-between h-16 max-md:px-4">
                        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <div className="bg-white rounded-lg p-2">
                                <FileTextIcon className="h-6 w-6 text-purple-600" />
                            </div>
                            <span className="text-xl">Medical Card Checker</span>
                        </Link>
                        <div className="md:hidden flex flex-col gap-1 cursor-pointer"
                            onClick={() => { setMenuOpen(!menuOpen) }} >
                            <div className={`w-6 h-0.75 space-1 bg-white rounded-xs  ${menuOpen ? `rotate-45` : `rotate-0`} origin-[7%_50%] transition-all `}></div>
                            <div className={`w-6 h-0.75 space-1 bg-white rounded-xs ${menuOpen ? `opacity-0` : `opacity-100`} transition-all `}></div>
                            <div className={`w-6 h-0.75 space-1 bg-white rounded-xs  ${menuOpen ? `-rotate-45` : `rotate-0`} origin-[7%_50%] transition-all `}></div>
                        </div>
                    </div>
                    <div className={` ${menuOpen ? `max-md:flex` : `max-md:hidden`}  max-md:h-auto md:flex max-md:flex-col md:items-center max-md:bg-[#ffffff29] md:space-x-4 max-md:pb-2 max-md:px-2`}
                        onClick={() => setMenuOpen(false)}>
                        <NavLinkItem className="" link="/" text={"Home"}>
                            <HomeIcon className="text-white" />
                        </NavLinkItem >
                        <NavLinkItem className="" link="/admin/submissions" text={"Admin"}>
                            <FileTextIcon className="h-5 w-5 text-white" />
                        </NavLinkItem >
                    </div>
                </div>
            </div>
        </nav >
    );
}
