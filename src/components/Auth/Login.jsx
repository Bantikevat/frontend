import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext"; // New import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <FaUser /> Login
        </h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          New User?{" "}
          <Link 
            to="/signup" 
            className="text-secondary hover:underline font-medium"
          >
            Signup Here
          </Link>
        </p>
      </div>
    </div>
  );
}