import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import Man from "../../assets/man.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { toggleSidebar } from "../../store/sidebar/sidebarSlice";

function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const name = useSelector((state) => state.auth.userData?.fullname);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  console.log(isSidebarOpen);

  const togglebar = () => {
    dispatch(toggleSidebar());
  };

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="flex w-full justify-evenly mt-4">
      <div className="flex justify-center text-center self-center text-4xl lg:hidden cursor-pointer">
        <RxHamburgerMenu onClick={togglebar} />
      </div>
      <div className="w-2/3 justify-center text-center self-center">
        <Searchbar />
      </div>
      <div className="flex flex-col justify-center text-center self-center">
        <Link to="/user">
          <img width="48" height="48" src={Man} alt="user" />
          {isAuthenticated ? (
            <p>{capitalizeName(name?.split(" ")[0])}</p>
          ) : (
            <button>User</button>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Header;
