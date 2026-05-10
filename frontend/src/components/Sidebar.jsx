import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-8">
        Dashboard
      </h2>

      <div className="flex flex-col gap-4">

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;