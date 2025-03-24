import React, { useState } from "react";
import axios from "axios";

const ReminderForm = ({ userId }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL; // Get API URL from .env
  const [form, setForm] = useState({
    medicine: "",
    time: "",
    dosage: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token"); // Retrieve auth token

      await axios.post(
        `${API_BASE_URL}/api/reminders`,
        {
          userId, // Ensure userId is sent
          ...form,
          time: new Date(form.time).toISOString(), // Convert time properly
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add authorization token
            "Content-Type": "application/json",
          },
        }
      );

      alert("Reminder Set Successfully! 🎉");
      setForm({ medicine: "", time: "", dosage: "" });
    } catch (error) {
      console.error("Error setting reminder:", error);
      alert(error.response?.data?.error || "⚠️ Failed to set reminder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 my-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        ⏰ Add New Reminder
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Medicine Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Medicine Name
          </label>
          <input
            type="text"
            name="medicine"
            value={form.medicine}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter medicine name"
            required
          />
        </div>

        {/* Date & Time Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
        </div>

        {/* Dosage Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Dosage Instructions
          </label>
          <input
            type="text"
            name="dosage"
            value={form.dosage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="e.g., 1 tablet after food"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          disabled={loading} // Disable button while submitting
        >
          {loading ? "Setting Reminder..." : "Set Reminder"}
        </button>
      </form>
    </div>
  );
};

export default ReminderForm;
