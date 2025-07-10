import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";


const MyProfile = () => {
  const { user } = useAuth();
  const { role, badge, roleLoading } = useUserRole();
  console.log(role)

  if (!user || roleLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">My Profile</h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary"
        />
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-semibold">
            Name: <span className="text-gray-700">{user.displayName}</span>
          </h3>
          <p className="text-lg">
            Email: <span className="text-gray-700">{user.email}</span>
          </p>
          <p className="text-lg">
            Badge:{" "}
            <span className={`badge ${badge === "Platinum"
              ? "badge-error"
              : badge === "Gold"
                ? "badge-warning"
                : "badge-success"
              }`}>
              {badge}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
