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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Serve Meals</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-md mb-6"
      />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow bg-white">
        <table className="table w-full">
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
            {currentRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No meal requests found.
                </td>
              </tr>
            ) : (
              currentRequests.map((r, idx) => (
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
                      <span className="text-sm text-gray-400">
                        Already Served
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {currentRequests.length === 0 ? (
          <p className="text-center text-gray-500">No meal requests found.</p>
        ) : (
          currentRequests.map((r, idx) => (
            <div
              key={r._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{r.mealTitle}</h3>
                <span
                  className={`badge ${r.status === "delivered"
                      ? "badge-success"
                      : "badge-warning"
                    }`}
                >
                  {r.status}
                </span>
              </div>
              <p>
                <strong>User:</strong> {r.userName}
              </p>
              <p>
                <strong>Email:</strong> {r.userEmail}
              </p>
              <div className="flex gap-2 mt-3">
                {r.status !== "delivered" ? (
                  <button
                    onClick={() => handleServe(r._id)}
                    className="btn btn-sm btn-primary flex-1"
                  >
                    Serve
                  </button>
                ) : (
                  <span className="text-sm text-gray-400 flex-1 text-center">
                    Already Served
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"
                }`}
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
