import React from 'react';
import Image from "next/image";
import Logo from "../assets/logo.png"
function NavBar() {
    return (
        <div className={'h-24 bg-primary px-10'}>
            <div className={"flex flex-row items-center h-full"}>
                <Image src={Logo} alt={"logo"} className={"h-16 w-16"}/>
            </div>
        </div>
    );
}

export default NavBar;