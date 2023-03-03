import { Fragment } from "react";
import SideBareBlog from "./SideBareBlog";
import SideBarMobile from "./SideBarMobile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"bg-secondary h-[calc(100vh_-_96px)]"}>
      <div className={"flex flex-row flex-6 h-full"}>
        <SideBareBlog />
        <SideBarMobile />
        <div className={"flex md:flex-5 w-full"}>{children}</div>
      </div>
    </div>
  );
}
