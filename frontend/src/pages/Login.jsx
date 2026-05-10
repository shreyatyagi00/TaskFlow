import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import API from "../api/axios";

function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/");

      console.log(res.data);

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1d4ed8] relative overflow-hidden px-4">
        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-500 opacity-30 rounded-full blur-3xl"></div>

<div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-600 opacity-30 rounded-full blur-3xl"></div>

<div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-cyan-400 opacity-20 rounded-full blur-3xl"></div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[460px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-[0_20px_70px_rgba(0,0,0,0.45)] px-10 py-12">

        <h2 className="text-3xl text-gray-400 font-bold mb-6 text-center">
          Login
        </h2>
        

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full bg-white/10 border border-white/10 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/30 outline-none px-6 py-4 rounded-2xl mb-5 text-[16px] text-white placeholder:text-gray-300 shadow-lg transition-all duration-300"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full bg-white/10 border border-white/10 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/30 outline-none px-6 py-4 rounded-2xl mb-5 text-[16px] text-white placeholder:text-gray-300 shadow-lg transition-all duration-300"
          onChange={handleChange}
        />

        <button
          className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(37,99,235,0.45)] transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg tracking-wide mt-2"
        >
          Login
        </button>
        <p className="text-center mt-4">

  Don't have an account?

  <Link
    to="/register"
    className="text-blue-500 ml-2"
  >
    Register
  </Link>

</p>

      </form>

    </div>
  );
}

export default Login;