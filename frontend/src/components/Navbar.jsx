import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        Team Task Manager
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;