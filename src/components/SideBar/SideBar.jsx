import React from "react";
import { Logo } from "../index";
import { IoHome } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", slug: "/", icon: IoHome, color: "text-nav-white" },
  {
    name: "Products",
    slug: "/products",
    icon: AiOutlineProduct,
    color: "text-nav-white",
  },
  { name: "Cart", slug: "/cart", icon: IoMdCart, color: "text-nav-white" },
  {
    name: "Offers",
    slug: "/offers",
    icon: BiSolidOffer,
    color: "text-nav-white",
  },
  {
    name: "Contact Us",
    slug: "/contact",
    icon: MdOutlineContactSupport,
    color: "text-nav-white",
  },
  {
    name: "Logout",
    slug: "/logout",
    icon: BiLogOut,
    color: "text-logout-color",
    requiresAuth: true,
  },
  {
    name: "Login/Register",
    slug: "/login",
    icon: BiLogIn,
    color: "text-logout-color",
    requiresAuth: false,
  },
];

const NavItem = ({ item, isActive, onClick }) => (
  <li
    key={item.slug}
    className={`flex items-center m-1 text-base font-medium cursor-pointer p-2 hover:text-nav-active hover:font-bold ${
      isActive ? "text-nav-active" : item.color
    } text-slate-50`}
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
  >
    <item.icon className="mr-2" />
    {item.name}
  </li>
);

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = false; // This should be dynamically set based on actual authentication status

  return (
    <div className="h-full pt-7 p-4 flex flex-col bg-nav-color">
      <div className="mt-10 flex flex-col justify-center text-center gap-2">
        <Logo width="100px" height="100px" />
        <h1 className="text-text-green mt-2 text-4xl md:text-3xl sm:text-2xl font-bold tracking-widest">
          Aoushadhi
        </h1>
      </div>
      <div>
        <ul className="mt-10 p-4">
          {navItems.map((item) =>
            item.requiresAuth === undefined ||
            item.requiresAuth === authStatus ? (
              <NavItem
                key={item.slug}
                item={item}
                isActive={location.pathname === item.slug}
                onClick={() => navigate(item.slug)}
              />
            ) : null
          )}
        </ul>
      </div>
      <div className="mt-10 p-4 border-t-2 border-text-green">
        <div className="flex justify-center text-center text-nav-white text-base">
          &copy; {new Date().getFullYear()} Acquired By @KunalSingla
        </div>
      </div>
    </div>
  );
};

export default SideBar;
