import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?query=${searchText}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => refetch(),
  });

  const handleRoleChange = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const actionText = currentRole === "admin" ? "Remove Admin" : "Make Admin";

    const confirm = await Swal.fire({
      title: `${actionText}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${actionText} successful`, "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary">Manage Users</h2>

      {/* Search input */}
      <div className="flex items-center gap-3 mb-6 max-w-md">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered flex-grow"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No users found.</p>
      ) : (
        <>
          {/* Desktop/tablet: Table view */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow bg-white">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Profile Pic</th>
                  <th className="whitespace-nowrap">Username</th>
                  <th className="whitespace-nowrap">Email</th>
                  <th className="whitespace-nowrap">Subscription</th>
                  <th className="whitespace-nowrap">Role</th>
                  <th className="whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-gray-100 transition-colors">
                    <td>{idx + 1}</td>
                    <td>
                      <img
                        src={user.profilePic}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${user.badge === "Premium" ? "badge-success" : "badge-ghost"
                          }`}
                      >
                        {user.badge || "Bronze"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${user.role === "admin" ? "badge-info" : "badge-neutral"
                          }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className={`btn btn-sm ${user.role === "admin" ? "btn-error" : "btn-primary"
                          }`}
                      >
                        {user.role === "admin" ? (
                          <>
                            <FaUserTimes className="mr-1" /> Remove Admin
                          </>
                        ) : (
                          <>
                            <FaUserShield className="mr-1" /> Make Admin
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Card view */}
          <div className="md:hidden space-y-4">
            {users.map((user, idx) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <span
                    className={`badge ${user.role === "admin" ? "badge-info" : "badge-neutral"
                      }`}
                  >
                    {user.role || "user"}
                  </span>
                </div>

                <p>
                  Subscription:{" "}
                  <span
                    className={`badge ${user.badge === "Premium" ? "badge-success" : "badge-ghost"
                      }`}
                  >
                    {user.badge || "Bronze"}
                  </span>
                </p>

                <button
                  onClick={() => handleRoleChange(user._id, user.role)}
                  className={`btn btn-sm w-full ${user.role === "admin" ? "btn-error" : "btn-primary"
                    }`}
                >
                  {user.role === "admin" ? (
                    <>
                      <FaUserTimes className="mr-1" /> Remove Admin
                    </>
                  ) : (
                    <>
                      <FaUserShield className="mr-1" /> Make Admin
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
