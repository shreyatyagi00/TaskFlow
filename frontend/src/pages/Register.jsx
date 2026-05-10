import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
  "/auth/register",
  formData
);

// Auto login after register
const loginRes = await API.post(
  "/auth/login",
  {
    email: formData.email,
    password: formData.password,
  }
);

// Save token
localStorage.setItem(
  "token",
  loginRes.data.token
);

// Redirect dashboard
navigate("/");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        >

          <option value="member">
            Member
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Register
        </button>
        <p className="text-center mt-4">

  Already have an account?

  <Link
    to="/login"
    className="text-blue-500 ml-2"
  >
    Login
  </Link>

</p>

      </form>

    </div>
  );
}

export default Register;