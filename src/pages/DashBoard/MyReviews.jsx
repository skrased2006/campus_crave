import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['myReviews', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    await axiosSecure.delete(`/reviews/${id}`);
    refetch();
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
                <td>{review.likes || 0}</td>
                <td>{review.reviewText}</td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-warning">Edit</button>
                  <button onClick={() => handleDelete(review._id)} className="btn btn-sm btn-error">Delete</button>
                  <Link to={`/meals/${review.mealId}`}>
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
