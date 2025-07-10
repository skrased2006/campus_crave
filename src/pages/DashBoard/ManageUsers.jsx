import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  // ✅ Fetch users with search query (username or email)
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?query=${searchText}`);
      return res.data;
    },
  });

  // ✅ Mutation to update role
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
    return <LoadingSpinner></LoadingSpinner>
  }




  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="flex items-center gap-2 mb-4">
        <FaSearch />
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Profile Pic</th>
                <th>Username</th>
                <th>Email</th>
                <th>Subscription</th>

                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
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
                      className={`badge ${user.badge === "Premium"
                        ? "badge-success"
                        : "badge-ghost"
                        }`}
                    >
                      {user.badge || "Bronze"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${user.role === "admin"
                        ? "badge-info"
                        : "badge-neutral"
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
      )}
    </div>
  );
};

export default ManageUsers;
