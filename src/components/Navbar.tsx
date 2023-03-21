import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

import { styles } from "../styles";

type NavMapProps = {
  active: string;
  setActive: Function;
  mobileView?: boolean;
  setToggle?: Function;
};

const NavMap = ({
  active,
  mobileView = false,
  setActive,
  setToggle,
}: NavMapProps) => (
  <ul
    className={`${
      mobileView
        ? "flex justify-end items-start flex-col gap-4"
        : "hidden sm:flex flex-row gap-10"
    } list-none`}
  >
    {navLinks.map((link) => (
      <li
        key={link.id}
        className={`${
          active === link.title ? "text-white" : "text-secondary"
        } ${
          mobileView
            ? " font-poppins font-medium text-[16px]"
            : " hover:text-white text-[18px] font-medium"
        } cursor-pointer`}
        onClick={() => {
          setActive(link.title);
          if (mobileView && setToggle) {
            setToggle((t: boolean) => !t);
          }
        }}
      >
        <a href={`#${link.id}`}>{link.title}</a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} className="w-9 h-9 object-contain" />
          <p className="text-white text=[18px] font-bold cursor-pointer flex">
            Hassan &nbsp;
            <span className="sm:block hidden">| Portfolio</span>
          </p>
        </Link>
        {<NavMap setActive={setActive} active={active} />}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            onClick={() => setToggle((t) => !t)}
            className="w-[28px] h-[28px] object-contain cursor-pointer"
          />
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-4 min-w-[140px] z-10 rounded-xl`}
          >
            {
              <NavMap
                mobileView
                setToggle={setToggle}
                active={active}
                setActive={setActive}
              />
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
