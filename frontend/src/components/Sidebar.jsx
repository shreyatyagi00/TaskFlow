import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Tasks",
      path: "/tasks",
    },
  ];

  return (
    <div className="w-[260px] min-h-screen bg-gradient-to-b from-[#020617] via-[#03122f] to-[#00163f] text-white p-6 shadow-2xl">

      <h1 className="text-3xl font-bold mb-10 text-blue-400">
        TaskFlow
      </h1>

      <div className="flex flex-col gap-3">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-lg transition duration-300 font-medium
              
              ${
                location.pathname === item.path
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }
            `}
          >
            {item.name}
          </Link>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;