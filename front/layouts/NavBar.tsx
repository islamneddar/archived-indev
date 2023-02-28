import React from "react";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import Logo from "../assets/logo.png";
import { toggleSideBarTopic } from "../redux/system.slice";

function NavBar() {
  const dispatch = useDispatch();

  return (
    <div className="h-24 bg-primary px-10">
      <div className="flex flex-row justify-between md:items-center h-full">
        <div className="h-full flex justify-center items-center">
          <Image src={Logo} alt="logo" className="h-16 w-16" />
        </div>

        <div className="block md:hidden h-full flex justify-center">
          <Bars3Icon
            className="w-8 cursor-pointer"
            onClick={() => {
              dispatch(toggleSideBarTopic());
            }}
           />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
