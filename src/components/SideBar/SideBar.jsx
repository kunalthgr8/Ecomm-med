import React from "react";
import { Logo } from "../index";
import { IoHome } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import authService from "../../appwrite/auth";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = async () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="h-full pt-7 p-4 flex flex-col bg-nav-color">
      <div className="mt-10 flex flex-col justify-center text-center gap-2">
        <Link to="/">
          <Logo width="100px" height="100px" />
        </Link>
        <h1 className="text-text-green mt-2 text-4xl md:text-3xl sm:text-2xl font-bold tracking-widest">
          Aoushadhi
        </h1>
      </div>
      <div>
        <ul className="mt-10 p-4">
          {navItems.map(
            (item) =>
              (item.requiresAuth === undefined ||
                item.requiresAuth === isAuthenticated /*|| item.requiresAuth === !isAuthenticated */) && (
                <NavItem
                  key={item.slug}
                  item={item}
                  isActive={location.pathname === item.slug}
                  onClick={
                    item.name === "Logout"
                      ? logoutHandler
                      : () => navigate(item.slug)
                  }
                />
              )
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
