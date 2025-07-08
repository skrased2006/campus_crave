import { FaBell } from "react-icons/fa";

const Topbar = () => {
  return (
    <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <div className="relative">
        <FaBell className="text-xl cursor-pointer" />
        <span className="absolute -top-2 -right-2 bg-pink-500 text-xs text-white rounded-full px-1">4</span>
      </div>
    </header>
  );
};

export default Topbar;
