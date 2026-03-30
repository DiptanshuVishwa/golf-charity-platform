import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful 🚀");

      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl w-[350px] border border-white/10">

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-black border border-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-black border border-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:scale-105 transition"
        >
          Login
        </button>

      </div>

    </div>
  );
}