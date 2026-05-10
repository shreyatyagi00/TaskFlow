import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="h-24 bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#2563eb] px-10 flex justify-between items-center shadow-xl">

      <h1 className="text-2xl font-bold text-gray-200">
        Welcome Back 👋
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-400 hover:bg-red-600 transition px-5 py-2 rounded-lg text-white font-medium"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;