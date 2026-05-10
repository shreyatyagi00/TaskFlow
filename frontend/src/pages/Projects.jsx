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

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Projects
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow mb-8"
          >

            <h2 className="text-2xl font-bold mb-4">
              Create Project
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              className="w-full border p-3 rounded mb-4"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Project Description"
              className="w-full border p-3 rounded mb-4"
              value={formData.description}
              onChange={handleChange}
            />

            <button
              className="bg-blue-500 text-white px-6 py-3 rounded"
            >
              Create
            </button>

          </form>

          <div className="grid grid-cols-3 gap-6">

            {projects.map((project) => (

              <div
                key={project._id}
                className="bg-white p-6 rounded shadow"
              >

                <h2 className="text-2xl font-bold mb-3">
                  {project.title}
                </h2>

                <p className="text-gray-600 mb-4">
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