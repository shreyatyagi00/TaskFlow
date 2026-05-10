import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../api/axios";

function Tasks() {

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

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/tasks/${id}/status`,
        { status }
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Tasks
          </h1>

          <div className="bg-white rounded shadow p-4 overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-3">
                    Title
                  </th>

                  <th className="text-left p-3">
                    Project
                  </th>

                  <th className="text-left p-3">
                    Assigned To
                  </th>

                  <th className="text-left p-3">
                    Priority
                  </th>

                  <th className="text-left p-3">
                    Status
                  </th>

                  <th className="text-left p-3">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {tasks.map((task) => (

                  <tr
                    key={task._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {task.title}
                    </td>

                    <td className="p-3">
                      {task.project?.title}
                    </td>

                    <td className="p-3">
                      {task.assignedTo?.name}
                    </td>

                    <td className="p-3">

                      <span className="bg-red-100 text-red-500 px-3 py-1 rounded">

                        {task.priority}

                      </span>

                    </td>

                    <td className="p-3">

                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded">

                        {task.status}

                      </span>

                    </td>

                    <td className="p-3">

                      <select
                        className="border p-2 rounded"
                        onChange={(e) =>
                          updateStatus(
                            task._id,
                            e.target.value
                          )
                        }
                      >

                        <option>
                          Change
                        </option>

                        <option value="Todo">
                          Todo
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Tasks;