import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ServeMeals = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get(`/meal-requests?search=${search}`);
        setRequests(res.data);
        setCurrentPage(1); // reset page when search changes
      } catch (err) {
        console.error("Error fetching meal requests", err);
      }
    };

    fetchRequests();
  }, [search, axiosSecure]);

  const handleServe = async (id) => {
    try {
      const res = await axiosSecure.patch(`/meal-requests/${id}/deliver`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Meal marked as delivered!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: "delivered" } : req
          )
        );
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Serve Meals</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-md mb-6"
      />

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>#</th>
              <th>Meal Title</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((r, idx) => (
              <tr key={r._id}>
                <td>{indexOfFirstItem + idx + 1}</td>
                <td>{r.mealTitle}</td>
                <td>{r.userName}</td>
                <td>{r.userEmail}</td>
                <td>
                  <span
                    className={`badge ${r.status === "delivered"
                      ? "badge-success"
                      : "badge-warning"
                      }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  {r.status !== "delivered" ? (
                    <button
                      onClick={() => handleServe(r._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Serve
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400">Already Served</span>
                  )}
                </td>
              </tr>
            ))}
            {currentRequests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
                  No meal requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServeMeals;
