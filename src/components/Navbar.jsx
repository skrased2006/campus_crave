import { Link, NavLink } from "react-router";
import { useState, useEffect } from "react";
import { FaBell, FaBars, FaTimes, FaHome, FaUtensils, FaClock, FaUser, FaTachometerAlt, FaInfoCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("👋 Logged out successfully!");
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("❌ Logout failed. Please try again.");
      });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const guestLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-primary flex items-center gap-2" : "hover:text-primary flex items-center gap-2"} onClick={() => setMobileMenuOpen(false)}>
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allmeal" className={({ isActive }) => isActive ? "font-bold text-primary flex items-center gap-2" : "hover:text-primary flex items-center gap-2"} onClick={() => setMobileMenuOpen(false)}>
          <FaUtensils /> Meals
        </NavLink>
      </li>
      <li>
        <NavLink to="/upcoming-meals" className={({ isActive }) => isActive ? "font-bold text-primary flex items-center gap-2" : "hover:text-primary flex items-center gap-2"} onClick={() => setMobileMenuOpen(false)}>
          <FaClock /> Upcoming Meals
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      {guestLinks}
     <li>
  <NavLink
    to="/about"
    className={({ isActive }) =>
      isActive
        ? "font-bold text-primary flex items-center gap-2"
        : "hover:text-primary flex items-center gap-2"
    }
    onClick={() => setMobileMenuOpen(false)}
  >
    <FaInfoCircle /> About
  </NavLink>
</li>

      <li>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-bold text-primary flex items-center gap-2" : "hover:text-primary flex items-center gap-2"} onClick={() => setMobileMenuOpen(false)}>
           <FaTachometerAlt/> Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-primary">
          <img src="https://i.ibb.co/wZX5dygz/images.png" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12"/>
          Campus Crave
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 text-base font-medium">
          {!user ? guestLinks : userLinks}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          {user && (
            <button aria-label="Notifications" className="btn btn-ghost btn-circle text-lg hover:text-primary transition-colors duration-200">
              <FaBell />
            </button>
          )}

          {/* Join Us button for guests */}
          {!user && (
            <Link to="/login" className="btn btn-primary btn-sm px-4 py-1 text-sm whitespace-nowrap">Join Us</Link>
          )}

          {/* User Avatar & Dropdown */}
          {user && (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary" aria-label="User menu">
                <img src={user.photoURL || "/default-avatar.png"} alt="User avatar" className="w-full h-full object-cover"/>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-lg border z-50 animate-fadeIn">
                  <div className="p-3 border-b">
                    <p className="font-semibold text-gray-700">{user.displayName || "User"}</p>
                  </div>
                  <ul className="menu p-2">
                    
                    <li><button onClick={handleLogout} className="text-red-500 hover:text-red-600 w-full text-left">Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="lg:hidden btn btn-ghost text-xl" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md animate-slideDown">
          <ul className="flex flex-col gap-4 p-4 text-lg font-medium">
            {!user ? guestLinks : userLinks}

            {/* Mobile logout / join us */}
            {user ? (
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600 w-full text-left">Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm w-full text-center">Join Us</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
