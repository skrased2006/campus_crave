import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router'; // ✅ ঠিক import
import Swal from 'sweetalert2';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['myReviews', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews/${user.email}`);
      return res.data;
    },
  });

  // ✅ Delete handler with confirmation
  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirmed.isConfirmed) return;

    const res = await axiosSecure.delete(`/reviews/${id}`);
    if (res.data.deletedCount > 0) {
      Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
      refetch();
    }
  };

  // ✅ Start editing
  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditedText(review.review);
  };

  // ✅ Submit edit
  const handleEditSubmit = async (id) => {
    const res = await axiosSecure.patch(`/reviews/${id}`, { review: editedText });
    if (res.data.modifiedCount > 0) {
      Swal.fire('Updated!', 'Review updated successfully.', 'success');
      setEditingReviewId(null);
      refetch();
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">Please login to see your reviews.</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.mealTitle}</td>
                <td>{review.like}</td>
                <td>
                  {editingReviewId === review._id ? (
                    <input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="input input-bordered input-sm w-full"
                    />
                  ) : (
                    review.review
                  )}
                </td>
                <td className="space-x-1">
                  {editingReviewId === review._id ? (
                    <button
                      onClick={() => handleEditSubmit(review._id)}
                      className="btn btn-sm btn-success"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(review)}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>

                  <Link to={`/meal/${review.mealId}`}>
                    <button className="btn btn-sm btn-info">View</button>
                  </Link>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  You haven't added any reviews yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
