import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

// चार्ट कंपोनेंट्स रजिस्टर करें
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ग्रेडिएंट कलर जनरेटर
const generateGradient = (ctx, color1, color2) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

const AnimatedChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);

  // डायनामिक डेटा जनरेटर
  const generateData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(() => Math.floor(Math.random() * 1000) + 500);
  };

  // चार्ट कॉन्फ़िगरेशन
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
      animateScale: true,
      animateRotate: true
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Poppins'
          }
        }
      },
      title: {
        display: true,
        text: 'रियल-टाइम सेल्स एनालिसिस',
        font: {
          size: 18,
          family: 'Poppins'
        },
        color: '#2d3748'
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: { family: 'Poppins' },
        bodyFont: { family: 'Poppins' }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#4a5568' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#4a5568' }
      }
    }
  };

  // ऑटो-अपडेट सिस्टम
  useEffect(() => {
    const initChart = () => {
      const ctx = document.createElement('canvas').getContext('2d');
      
      setChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'सेल्स (₹)',
            data: generateData(),
            backgroundColor: generateGradient(ctx, '#4f46e5', '#818cf8'),
            borderColor: '#4f46e5',
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: '#6366f1'
          }
        ]
      });
      setLoading(false);
    };

    initChart();
    const interval = setInterval(() => {
      setChartData(prev => ({
        ...prev,
        datasets: [{
          ...prev.datasets[0],
          data: generateData()
        }]
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // मैनुअल रिफ्रेश
  const handleRefresh = () => {
    setChartData(prev => ({
      ...prev,
      datasets: [{
        ...prev.datasets[0],
        data: generateData()
      }]
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-2xl relative"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">सेल्स डैशबोर्ड</h2>
        <motion.button
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRefresh}
          className="p-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
        >
          <FiRefreshCw className="w-6 h-6 text-indigo-600" />
        </motion.button>
      </div>

      <div className="h-96 relative">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
          </div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {chartData.labels.map((month, index) => (
          <motion.div
            key={month}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
          >
            {month}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedChart;