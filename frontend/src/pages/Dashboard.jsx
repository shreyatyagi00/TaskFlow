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

      <div className="flex-1 min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe,_#bfdbfe,_#93c5fd)]">

        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Dashboard
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="relative overflow-hidden bg-white/70 backdrop-blur-md p-8 rounded-[30px] shadow-xl border border-white/40 hover:-translate-y-2 transition duration-300">
            <div className="absolute -bottom-10 left-0 w-full h-24 bg-blue-200/30 rounded-[100%]"></div>
              <h2 className="text-xl font-bold">
                Total Tasks
              </h2>

              <p className="text-3xl mt-3 text-blue-500">
                {tasks.length}
              </p>

            </div>

             <div className="relative overflow-hidden bg-white/70 backdrop-blur-md p-8 rounded-[30px] shadow-xl border border-white/40 hover:-translate-y-2 transition duration-300">
            <div className="absolute -bottom-10 left-0 w-full h-24 bg-green-200/30 rounded-[100%]"></div>
              <h2 className="text-xl font-bold">
                Completed
              </h2>

              <p className="text-3xl mt-3 text-green-500">
                {completedTasks.length}
              </p>

            </div>

            <div className="relative overflow-hidden bg-white/70 backdrop-blur-md p-8 rounded-[30px] shadow-xl border border-white/40 hover:-translate-y-2 transition duration-300">
            <div className="absolute -bottom-10 left-0 w-full h-24 bg-yellow-200/30 rounded-[100%]"></div>
              <h2 className="text-xl font-bold">
                Pending
              </h2>

              <p className="text-3xl mt-3 text-yellow-500">
                {pendingTasks.length}
              </p>

            </div>

           <div className="relative overflow-hidden bg-white/70 backdrop-blur-md p-8 rounded-[30px] shadow-xl border border-white/40 hover:-translate-y-2 transition duration-300">
            <div className="absolute -bottom-10 left-0 w-full h-24 bg-red-200/30 rounded-[100%]"></div>
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