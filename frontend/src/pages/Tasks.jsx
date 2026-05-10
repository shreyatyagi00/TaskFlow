import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../api/axios";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/tasks",
        {
          ...formData,
          assignedTo: null,
        }
      );

      setFormData({
        title: "",
        description: "",
        project: "",
        priority: "Medium",
        dueDate: "",
      });

      fetchTasks();

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

      <div className="flex-1 min-h-screen bg-gradient-to-br from-[#edf4ff] via-[#dbeafe] to-[#bfdbfe]">

        <Navbar />

        <div className="p-8 min-h-screen bg-gradient-to-br from-[#edf4ff] via-[#dbeafe] to-[#bfdbfe]">

          {/* <h1 className="text-2xl font-bold text-[#0f172a] mb-4 tracking-wide">
            Tasks
          </h1> */}

          {/* CREATE TASK FORM */}

          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-xl border border-white rounded-[35px] shadow-[0_10px_40px_rgba(37,99,235,0.15)] p-4 mb-4"
          >

            <h2 className="text-2xl text-center font-bold text-[#0f172a] mb-4">
              Create Task
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* TITLE */}
  <input
    type="text"
    name="title"
    placeholder="Task Title"
    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#f8fbff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[17px]"
    value={formData.title}
    onChange={handleChange}
  />

  {/* PROJECT */}
  <select
    name="project"
    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#f8fbff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[17px]"
    value={formData.project}
    onChange={handleChange}
  >

    <option value="">
      Select Project
    </option>

    {projects.map((project) => (

      <option
        key={project._id}
        value={project._id}
      >
        {project.title}
      </option>

    ))}

  </select>

  {/* DESCRIPTION */}
  <textarea
    name="description"
    placeholder="Task Description"
    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#f8fbff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[17px] md:col-span-2"
    value={formData.description}
    onChange={handleChange}
  />

  {/* PRIORITY */}
  <select
    name="priority"
    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#f8fbff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[17px]"
    value={formData.priority}
    onChange={handleChange}
  >

    <option value="Low">
      Low
    </option>

    <option value="Medium">
      Medium
    </option>

    <option value="High">
      High
    </option>

  </select>

  {/* DATE */}
  <input
    type="date"
    name="dueDate"
    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-[#f8fbff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[17px]"
    value={formData.dueDate}
    onChange={handleChange}
  />

</div>

<div className="mt-6">

  <button
    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
  >
    Create Task
  </button>

</div>

          </form>

          {/* TASK TABLE */}

          <div className="bg-white/90 backdrop-blur-xl rounded-[35px] shadow-[0_10px_40px_rgba(37,99,235,0.12)] p-2 overflow-x-auto">

            <table className="w-full border-separate border-spacing-y-4">

              <thead>

                <tr className="text-[#0f172a]">

                  <th className="text-left px-6 py-4 text-lg font-bold text-[#0f172a]">
                    Title
                  </th>

                  <th className="text-left p-3">
                    Project
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
  className="bg-white hover:scale-[1.01] transition-all duration-300 shadow-sm rounded-2xl"
>

                    <td className="px-6 py-5">

  <div className="flex items-center gap-4">

    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
      📄
    </div>

    <span className="font-semibold text-[#1e293b]">
      {task.title}
    </span>

  </div>

</td>

                    <td className="px-6 py-5 font-medium text-[#334155]">
  {task.project?.title}
</td>

                    <td className="p-3">

                      <span
  className={`px-4 py-2 rounded-full text-sm font-semibold
  ${
    task.priority === "High"
      ? "bg-red-100 text-red-500"
      : task.priority === "Medium"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600"
  }`}
>

                        {task.priority}

                      </span>

                    </td>

                    <td className="p-3">

                      <span
  className={`px-4 py-2 rounded-full text-sm font-semibold
  ${
    task.status === "Completed"
      ? "bg-green-100 text-green-600"
      : task.status === "In Progress"
      ? "bg-purple-100 text-purple-600"
      : "bg-blue-100 text-blue-600"
  }`}
>

                        {task.status}

                      </span>

                    </td>

                    <td className="p-3">

                      <select
                        className="border border-blue-200 px-5 py-3 rounded-xl bg-white hover:border-blue-500 transition-all font-semibold text-blue-600"
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