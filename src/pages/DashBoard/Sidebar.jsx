import { Link, NavLink } from "react-router";
import {
  FaTachometerAlt,
  FaUsers,
  FaUtensils,
  FaSignOutAlt,
  FaPlusCircle,
  FaUserCircle,
  FaComments,
  FaCreditCard
} from "react-icons/fa";


import { MdOutlineRateReview, MdFastfood } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import useUserRole from "../../hooks/useUserRole";

const Sidebar = () => {

  const { role, roleLoading } = useUserRole();




  const navLinkClass =
    "flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const activeClass = "bg-primary text-white";
  const inactiveClass = "text-gray-700 hover:bg-gray-100";

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between sticky top-0">
      {/* Logo Section */}
      <div>
        <div className="flex items-center gap-2 p-4 border-b">
          <Link to='/' className="flex gap-2 items-center">
            <img
              src="https://i.ibb.co/wZX5dygz/images.png"
              className="w-10 h-10"
              alt="Logo"
            />
            <span className="text-xl font-bold text-primary">Campas Crave</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">

          {
            !roleLoading && role === 'user' &&
            <>

              <NavLink
                to="/dashboard/requested-meals"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <FaUtensils /> Requested Meals
              </NavLink>

              <NavLink
                to="/dashboard/my-reviews"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <FaComments /> My Reviews
              </NavLink>

              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <FaCreditCard /> Payment History
              </NavLink>
            </>
          }




          {
            !roleLoading && role === 'admin' &&
            <>
              <NavLink
                to="/dashboard/manegUsers"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <FaUsers /> Manage Users
              </NavLink>

              <NavLink
                to="/dashboard/addMeal"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <FaPlusCircle /> Add Meal
              </NavLink>


              <NavLink
                to="/dashboard/allMeals"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <FaUtensils /> All Meals
              </NavLink>

              <NavLink
                to="/dashboard/admin/serve-meals"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <MdFastfood /> Serve Meals
              </NavLink>

              <NavLink
                to="/dashboard/all-reviews"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <MdOutlineRateReview /> All Reviews
              </NavLink>

              <NavLink
                to="/dashboard/admin/upcoming-meals"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <MdFastfood /> Upcoming Meals
              </NavLink>



            </>
          }


        </nav>
      </div>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t">
        <p className="text-xs text-gray-400 mb-2">My Account</p>

        {
          !roleLoading && role === 'user' &&
          <>
            <NavLink
              to="/dashboard/myProfile"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : "text-gray-600 hover:bg-gray-100"}`
              }
            >
              <RiUserSettingsLine /> Profile
            </NavLink>
          </>
        }
        {
          !roleLoading && role === 'admin' &&
          <>
            <NavLink
              to="/dashboard/adminProfile"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : "text-gray-600 hover:bg-gray-100"}`
              }
            >
              <RiUserSettingsLine /> Profile
            </NavLink>
          </>
        }




      </div>
    </div>
  );
};

export default Sidebar;
