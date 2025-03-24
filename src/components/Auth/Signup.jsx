import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. पहले साइनअप करें
      const res = await axios.post(
        `${apiUrl}/api/auth/signup`,
        { name, email, password }
      );

      // 2. साइनअप सफल होने पर ऑटो लॉगिन
      await login(email, password);
      
      // 3. डैशबोर्ड पर रीडायरेक्ट
      navigate("/dashboard");

    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "सर्वर कनेक्शन विफल! बैकेंड चेक करें";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <FaUserPlus /> साइन अप
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">नाम</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">ईमेल</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">पासवर्ड</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            खाता बनाएं
          </button>
        </form>

        <p className="mt-4 text-center">
          पहले से खाता है?{" "}
          <Link 
            to="/login" 
            className="text-secondary hover:underline font-medium"
          >
            लॉगिन करें
          </Link>
        </p>
      </div>
    </div>
  );
}