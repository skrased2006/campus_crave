import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
      <p className="mb-6 text-gray-500">
        You do not have permission to access this page.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
