import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { FiActivity, FiHeart, FiTrendingUp, FiUser } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

const Profile = () => {
  const { user } = useAuth();
  const [healthStats, setHealthStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHealthStats(data);
      } catch (error) {
        console.error("Error fetching health data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Process data for chart
  const chartData = {
    labels: healthStats?.map(entry => 
      new Date(entry.createdAt).toLocaleDateString()
    ) || [],
    datasets: [
      {
        label: 'Systolic Pressure',
        data: healthStats?.map(entry => entry.bloodPressure.systolic) || [],
        borderColor: '#3B82F6',
        tension: 0.4,
      },
      {
        label: 'Diastolic Pressure',
        data: healthStats?.map(entry => entry.bloodPressure.diastolic) || [],
        borderColor: '#10B981',
        tension: 0.4,
      }
    ]
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50"
    >
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Health Profile
          </h1>
        </motion.div>

        {/* Personal Info Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FiUser className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold">Personal Information</h2>
          </div>
          <div className="space-y-2">
            <p className="text-lg"><span className="font-semibold">Name:</span> {user?.name}</p>
            <p className="text-lg"><span className="font-semibold">Email:</span> {user?.email}</p>
          </div>
        </motion.div>

        {/* Health Stats Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Total Entries */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FiActivity className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Total Entries</h3>
              </div>
              <p className="text-3xl font-bold text-purple-600">
                {healthStats?.length || 0}
              </p>
            </motion.div>

            {/* Average BP */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-pink-100 rounded-full">
                  <FiHeart className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold">Average BP</h3>
              </div>
              <p className="text-3xl font-bold text-pink-600">
                {healthStats?.length ? 
                  Math.round(healthStats.reduce((acc, curr) => acc + curr.bloodPressure.systolic, 0) / healthStats.length) : 0
                }/
                {healthStats?.length ? 
                  Math.round(healthStats.reduce((acc, curr) => acc + curr.bloodPressure.diastolic, 0) / healthStats.length) : 0
                }
              </p>
            </motion.div>

            {/* Latest Entry */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <FiTrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Latest Reading</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {healthStats?.[0]?.bloodPressure.systolic || '--'}/
                {healthStats?.[0]?.bloodPressure.diastolic || '--'}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Health Chart */}
        {healthStats?.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-semibold mb-6">Blood Pressure Trends</h2>
            <div className="h-64">
              <Line 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default Profile;