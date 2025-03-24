import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext"; // New import

const HealthForm = () => {
  const { user } = useAuth();
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [medications, setMedications] = useState([{ name: "", time: "" }]);
  const [error, setError] = useState("");

  // दवाओं के फ़ील्ड जोड़ें
  const addMedication = () => {
    setMedications([...medications, { name: "", time: "" }]);
  };

  // दवाओं के फ़ील्ड अपडेट करें
  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  // फॉर्म सबमिट करें
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/data`,
        {
          bloodPressure: { systolic: Number(systolic), diastolic: Number(diastolic) },
          sugarLevel: Number(sugarLevel),
          medications: medications.filter(m => m.name && m.time)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // फॉर्म रीसेट करें
      setSystolic("");
      setDiastolic("");
      setSugarLevel("");
      setMedications([{ name: "", time: "" }]);
      alert("डेटा सफलतापूर्वक सहेजा गया!");
      
    } catch (error) {
      setError(error.response?.data?.message || "डेटा सेव करने में त्रुटि");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">नया स्वास्थ्य डेटा जोड़ें</h2>
      
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ब्लड प्रेशर */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">सिस्टोलिक प्रेशर (mmHg)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">डायस्टोलिक प्रेशर (mmHg)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              required
            />
          </div>
        </div>

        {/* शुगर लेवल */}
        <div>
          <label className="block text-gray-700 mb-2">ब्लड शुगर (mg/dL)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={sugarLevel}
            onChange={(e) => setSugarLevel(e.target.value)}
            required
          />
        </div>

        {/* दवाएं */}
        <div className="space-y-4">
          {medications.map((med, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="दवा का नाम"
                  className="w-full p-2 border rounded"
                  value={med.name}
                  onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <input
                  type="time"
                  className="w-full p-2 border rounded"
                  value={med.time}
                  onChange={(e) => handleMedicationChange(index, 'time', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addMedication}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + दवा जोड़ें
          </button>
        </div>

        {/* सबमिट बटन */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          डेटा सहेजें
        </button>
      </form>
    </div>
  );
};

export default HealthForm;