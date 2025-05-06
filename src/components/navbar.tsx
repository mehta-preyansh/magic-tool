import React from "react";
import HeaderAuth from "./header-auth";
import ThemeToggle from "./theme-toggle";
import NavigationToggle from "./navigation-toggle";
import { getUser } from "@/lib/getUser";

const Navbar = async () => {
  const user = await getUser();
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-screen-xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold select-none cursor-pointer">
          <NavigationToggle isAuthenticated = {user? true: false}/>
        </div>
        <div className="flex gap-5 items-center">
          <HeaderAuth isAuthenticated = {user? true: false}/>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;