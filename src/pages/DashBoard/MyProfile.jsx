import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import { FaEnvelope, FaPhoneAlt, FaHome, FaUserShield } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, badge, roleLoading } = useUserRole();

  if (!user || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left Side - Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-md"
          />
          <span
            className={`mt-4 px-4 py-1 rounded-full text-white text-sm font-semibold ${
              badge === "Platinum"
                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                : badge === "Gold"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {badge} Member
          </span>
        </div>

        {/* Right Side - Info */}
        <div className="flex-1 space-y-4 text-lg">
          <p className="flex items-center gap-3">
            <FaUserShield className="text-primary" />
            <span className="font-semibold">Name:</span>{" "}
            <span className="text-gray-700">{user.displayName}</span>
          </p>
          <p className="flex items-center gap-3">
            <FaEnvelope className="text-primary" />
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-gray-700">{user.email}</span>
          </p>
          <p className="flex items-center gap-3">
            <FaUserShield className="text-primary" />
            <span className="font-semibold">Role:</span>{" "}
            <span className="capitalize text-gray-700">{role}</span>
          </p>
        
        </div>
      </div>

    
    </div>
  );
};

export default MyProfile;
