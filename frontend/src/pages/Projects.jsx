import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../api/axios";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

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
        "/projects",
        {
          ...formData,
          members: [],
        }
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6 min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe,_#bfdbfe,_#93c5fd)]">

          <h1 className="text-3xl font-bold text-[#0f172a] mb-6">
            Projects
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-lg p-10 rounded-[35px] shadow-2xl border border-white/40 mb-12"
          >

            <h2 className="text-xl font-bold mb-8 text-[#0f172a] border-l-4 border-blue-500 pl-4">
              Create Project
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              className="w-full mb-2 p-5 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-blue-200 text-m shadow-sm"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Project Description"
              className="w-full mb-2 p-5 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-blue-200 text-m shadow-sm"
              value={formData.description}
              onChange={handleChange}
            />

            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-2xl text-m font-semibold shadow-lg hover:scale-105 transition duration-300"
            >
              Create
            </button>

          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {projects.map((project) => (

              <div
                key={project._id}
               className="relative overflow-hidden bg-white/70 backdrop-blur-lg p-8 rounded-[30px] shadow-2xl border border-white/40 hover:-translate-y-2 transition duration-300"
              >
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-blue-100 to-blue-200 opacity-40 rounded-t-full"></div>
                <h2 className="text-3xl font-bold text-[#0f172a] mb-3">
                  {project.title}
                </h2>

                <p className="text-gray-600 text-lg">
                  {project.description}
                </p>

                <div className="text-sm text-gray-500">

                  Created By:
                  {" "}
                  {project.createdBy?.name}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Projects;