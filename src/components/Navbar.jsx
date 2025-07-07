import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
  }




  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : "hover:text-primary"
          }
        >
          Meals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/upcoming-meals"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : "hover:text-primary"
          }
        >
          Upcoming Meals
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar px-4 py-2 max-w-10/12 mx-auto">
        <div className="navbar-start">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 text-primary"
          >
            <img
              src="https://i.ibb.co/wZX5dygz/images.png"
              alt="logo"
              className="w-12 h-12"
            />
            Campus Crave
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-base font-medium">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {/* Notification Icon */}
          <button className="btn btn-ghost btn-circle text-lg">
            <FaBell />
          </button>

          {/* If NOT logged in */}
          {!user && (
            <Link to="/login" className="btn btn-primary btn-sm">
              Join Us
            </Link>
          )}

          {/* If logged in */}
          {user && (
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer overflow-hidden"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-lg border z-50">
                  <div className="p-3 border-b">
                    <p className="font-semibold text-gray-700">
                      {user.displayName || "User"}
                    </p>
                  </div>
                  <ul className="menu p-2">
                    <li>
                      <Link to="/dashboard/my-profile">Dashboard</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
