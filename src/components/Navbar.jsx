import { Link } from "react-router-dom";
import Logout from "./auth/Logout";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className='daisy-navbar bg-gray-900 z-20'>
      <div className='daisy-navbar-start'>
        <div className='daisy-dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='daisy-btn daisy-btn-ghost lg:hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul className='daisy-menu daisy-menu-sm daisy-dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
            <li>
              <Link to={"/"}>
                <a>Categories</a>
              </Link>
            </li>
            <li>
              <Link to={"/searchMovies"}>
                <a>Search Movies</a>
              </Link>
            </li>

            <li>
              <Link to={"/popularMovies"}>
                <a>Popular Movies</a>
              </Link>
            </li>
            <li>
              <Link to={"/upcomingMovies"}>
                <a>Upcoming Movies</a>
              </Link>
            </li>
          </ul>
        </div>
        <Link to={"/"}>
          <a className='daisy-btn daisy-btn-ghost text-xl'>MovieAPP</a>
        </Link>
      </div>
      <div className='daisy-navbar-center hidden lg:flex'>
        <ul className='daisy-menu daisy-menu-horizontal gap-3 px-1'>
          <li>
            <Link to={"/"}>
              <a>Categories</a>
            </Link>
          </li>
          <li>
            <Link to={"/searchMovies"}>
              <a>Search Movies</a>
            </Link>
          </li>

          <li>
            <Link to={"/popularMovies"}>
              <a>Popular Movies</a>
            </Link>
          </li>
          <li>
            <Link to={"/upcomingMovies"}>
              <a>Upcoming Movies</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className='daisy-navbar-end '>
        <a className='daisy-btn' onClick={handleLogout}>
          <Logout />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
