import React from "react";
import HeaderAuth from "./header-auth";
import ThemeToggle from "./theme-toggle";
import NavigationToggle from "./navigation-toggle";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-screen-xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold select-none cursor-pointer">
          <NavigationToggle/>
        </div>
        <div className="flex gap-5 items-center">
          <HeaderAuth />
          <ThemeToggle/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;