// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import Charts from '../components/Dashboard/Charts';
import ReminderForm from '../components/Reminders/Form';
import HealthForm from '../components/Dashboard/HealthForm';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    avgSystolic: 0,
    avgDiastolic: 0,
    avgSugar: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setHealthData(response.data);
        calculateStats(response.data);
      } catch (error) {
        console.error("डेटा लोड करने में त्रुटि:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateStats = (data) => {
    const totals = data.reduce((acc, curr) => ({
      systolic: acc.systolic + curr.bloodPressure.systolic,
      diastolic: acc.diastolic + curr.bloodPressure.diastolic,
      sugar: acc.sugar + curr.sugarLevel
    }), { systolic: 0, diastolic: 0, sugar: 0 });

    setStats({
      avgSystolic: totals.systolic / data.length || 0,
      avgDiastolic: totals.diastolic / data.length || 0,
      avgSugar: totals.sugar / data.length || 0
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* हेडर सेक्शन */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold">नमस्ते, {user?.name}</h1>
          <p className="text-gray-600">आपका स्वास्थ्य सारांश</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          लॉगआउट
        </button>
      </div>

      {/* रिमाइंडर और क्विक स्टैट्स */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">💊 दवा रिमाइंडर सेट करें</h2>
          <ReminderForm userId={user?._id} />
        </div>

        {/* क्विक स्टैट्स कार्ड */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">औसत सिस्टोलिक</h3>
            <p className="text-3xl font-bold text-primary">
              {stats.avgSystolic.toFixed(1)}
            </p>
            <span className="text-sm text-gray-500">mmHg</span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">औसत डायस्टोलिक</h3>
            <p className="text-3xl font-bold text-secondary">
              {stats.avgDiastolic.toFixed(1)}
            </p>
            <span className="text-sm text-gray-500">mmHg</span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">औसत शुगर</h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats.avgSugar.toFixed(1)}
            </p>
            <span className="text-sm text-gray-500">mg/dL</span>
          </div>
        </div>
      </div>

      {/* चार्ट और फॉर्म सेक्शन */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">स्वास्थ्य प्रवृत्तियाँ</h2>
          <Charts healthData={healthData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">नया डेटा जोड़ें</h2>
          <HealthForm />
        </div>
      </div>

      {/* हाल का डेटा टेबल */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">हाल के रिकॉर्ड्स</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4">तारीख</th>
                <th className="text-left py-3 px-4">सिस्टोलिक</th>
                <th className="text-left py-3 px-4">डायस्टोलिक</th>
                <th className="text-left py-3 px-4">शुगर</th>
              </tr>
            </thead>
            <tbody>
              {healthData.map((entry) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{entry.bloodPressure.systolic}</td>
                  <td className="py-3 px-4">{entry.bloodPressure.diastolic}</td>
                  <td className="py-3 px-4">{entry.sugarLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;