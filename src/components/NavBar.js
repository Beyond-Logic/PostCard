/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const NavBar = () => {
  // let navigate = useNavigate();
  let location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    // navigate("/");
    window.location = "/";
    setUser(null);
  }, [dispatch]);

  useEffect(() => {}, [user]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logout, user?.token]);

  return (
    <div className="flex justify-between items-center shadow-lg h-20 mt-2 rounded-xl lg:space-x-10 px-5 mx-10">
      <Link to="/">
        <div className="flex space-x-5 items-center">
          <h2 className="text-3xl text-blue-500">PostCard</h2>
        </div>
      </Link>
      {user ? (
        <div className="flex space-x-5 items-center">
          <div className="flex items-center space-x-3">
            <div>
              {" "}
              {user?.result?.picture && (
                <img
                  src={user?.result?.picture}
                  alt={user?.result?.name}
                  className="rounded-full w-12"
                />
              )}
            </div>
            <div>{user?.result?.name}</div>
          </div>
          <AiOutlineLogout
            size={20}
            color="red"
            onClick={logout}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <Link to="/auth">
          {" "}
          <button className="bg-blue-800 text-base text-white px-8 py-2 rounded-md">
            SIGN IN
          </button>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
