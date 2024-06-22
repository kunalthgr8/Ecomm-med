import React, { useCallback } from "react";
import { Logo } from "../index";
import { IoHome } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import {
  MdDashboard,
  MdDomainAdd,
  MdOutlineContactSupport,
} from "react-icons/md";
import { ImCross } from "react-icons/im";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { toggleSidebar } from "../../store/sidebar/sidebarSlice";
import authService from "../../appwrite/auth";
import "./HeaderSidebar.css";

const NAV_ITEMS = [
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

const ADMIN_NAV_ITEMS = [
  { name: "Dashboard", slug: "/", icon: MdDashboard, color: "text-nav-white" },
  {
    name: "My Products",
    slug: "/getAdminProducts",
    icon: AiOutlineProduct,
    color: "text-nav-white",
  },
  {
    name: "Add Product",
    slug: "/addproduct",
    icon: MdDomainAdd,
    color: "text-nav-white",
  },
  {
    name: "Customers",
    slug: "/customers",
    icon: MdOutlineContactSupport,
    color: "text-nav-white",
  },
  {
    name: "Contact Info",
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
];

const NavItem = React.memo(({ item, isActive, onClick, totalItemsInCart }) => (
  <li
    className={`flex items-center m-1 text-base font-medium cursor-pointer p-2 hover:text-nav-active hover:font-bold ${
      isActive ? "text-nav-active" : item.color
    } text-slate-50`}
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
  >
    <item.icon className="mr-2" />
    {item.name === "Cart"
      ? `${item.name} ${totalItemsInCart || ""}`
      : item.name}
  </li>
));

const HeaderSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const roleType = useSelector((state) => state.auth.userData);
  const isAdmin = roleType?.role === "admin" || false;
  const filteredNavItems = isAdmin ? ADMIN_NAV_ITEMS : NAV_ITEMS;
  const totalItemsInCart = useSelector((state) => state.cart.length);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  const logoutHandler = useCallback(async () => {
    await authService.logout();
    dispatch(logout());
    dispatch(toggleSidebar());
    navigate("/login");
  }, [dispatch, navigate]);

  const handleLinkClick = (slug) => {
    navigate(slug);
    dispatch(toggleSidebar());
  };

//   ${
//     isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//   }

  return (
    <>
      {isSidebarOpen && (
        <div
          className={`fixed top-0 left-0 h-full bg-nav-color transform transition-transform duration-300 z-50`}
        >
          <div className="h-full pt-5 p-4 flex flex-col">

            <div className="mt-8 flex flex-col justify-center text-center gap-2" onClick={() => handleLinkClick("/")}>
              <Link to="/">
                <Logo width="100px" height="100px" />
              </Link>

              <h1 className="text-text-green mt-2 text-4xl md:text-3xl sm:text-2xl font-bold tracking-widest">
                Aoushadhi
              </h1>
            </div>
            <ul className="mt-8 p-4">
              {filteredNavItems.map((item) => {
                const { slug, name, requiresAuth } = item;
                const isVisible =
                  requiresAuth === undefined ||
                  requiresAuth === isAuthenticated ||
                  isAdmin;
                const isActive = location.pathname === slug;
                const onClick =
                  name === "Logout"
                    ? logoutHandler
                    : () => handleLinkClick(slug);

                return (
                  isVisible && (
                    <NavItem
                      key={slug}
                      item={item}
                      isActive={isActive}
                      totalItemsInCart={totalItemsInCart}
                      onClick={onClick}
                    />
                  )
                );
              })}
            </ul>
            <div className="mt-8 p-4 border-t-2 border-text-green">
              <div className="flex justify-center text-center text-nav-white text-base">
                &copy; {new Date().getFullYear()} Acquired By @KunalSingla
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSideBar;
