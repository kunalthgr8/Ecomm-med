import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import Man from "../../assets/man.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const name = useSelector((state) => state.auth.userData?.fullname);

  return (
    <div className="flex w-full justify-evenly mt-4">
      <div className="w-2/3 justify-center text-center self-center">
        <Searchbar />
      </div>
      <div className="flex flex-col justify-center text-center self-center">
        <Link to="/user">
          <img width="48" height="48" src={Man} alt="user" />
          {isAuthenticated ? (
            <p>{name?.split(" ")[0]}</p>
          ) : (
            <button>User</button>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Header;
