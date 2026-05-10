import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../api/axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const pendingTasks = tasks.filter(
    (task) => task.status === "Todo"
  );

  const overdueTasks = tasks.filter(
    (task) => {
      return (
        new Date(task.dueDate) < new Date() &&
        task.status !== "Completed"
      );
    }
  );

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Dashboard
          </h1>

          <div className="grid grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded shadow">

              <h2 className="text-xl font-bold">
                Total Tasks
              </h2>

              <p className="text-3xl mt-3">
                {tasks.length}
              </p>

            </div>

            <div className="bg-white p-6 rounded shadow">

              <h2 className="text-xl font-bold">
                Completed
              </h2>

              <p className="text-3xl mt-3 text-green-500">
                {completedTasks.length}
              </p>

            </div>

            <div className="bg-white p-6 rounded shadow">

              <h2 className="text-xl font-bold">
                Pending
              </h2>

              <p className="text-3xl mt-3 text-yellow-500">
                {pendingTasks.length}
              </p>

            </div>

            <div className="bg-white p-6 rounded shadow">

              <h2 className="text-xl font-bold">
                Overdue
              </h2>

              <p className="text-3xl mt-3 text-red-500">
                {overdueTasks.length}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;