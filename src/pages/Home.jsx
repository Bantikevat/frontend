import React from "react";
import { Link } from "react-router-dom";


import { motion } from "framer-motion";
import { FiActivity, FiHeart, FiClock } from "react-icons/fi";

// Hero Section Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.3,
      delayChildren: 0.2 
    }
  }
};

const childVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 120 
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
   
      
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-grow container mx-auto px-4 py-16 text-center"
      >
        {/* Hero Section */}
        <motion.div variants={childVariants} className="mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Take Control of Your Health
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            variants={childVariants}
          >
            Track your vital health metrics with beautiful visualizations and get personalized insights
          </motion.p>

          <motion.div 
            className="flex flex-col md:flex-row justify-center gap-6"
            variants={childVariants}
          >
            <Link
              to="/login"
              className="relative inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <span className="absolute top-0 right-0 -mt-2 -mr-2 px-3 py-1 bg-white text-blue-600 rounded-full text-xs font-bold shadow-sm">
                New
              </span>
            </Link>
            
            <Link
              to="/dashboard"
              className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-blue-100"
            >
              Live Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Features Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-20 px-4"
          variants={containerVariants}
        >
          {[
            { 
              icon: <FiActivity className="w-12 h-12 mb-4 text-blue-600" />,
              title: "Real-time Tracking",
              text: "Monitor your health metrics 24/7 with interactive dashboards"
            },
            { 
              icon: <FiHeart className="w-12 h-12 mb-4 text-pink-600" />,
              title: "Health Analysis",
              text: "Get AI-powered insights and health recommendations"
            },
            { 
              icon: <FiClock className="w-12 h-12 mb-4 text-purple-600" />,
              title: "Medication Reminders",
              text: "Never miss a dose with smart notifications system"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              variants={childVariants}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              whileHover={{ y: -10 }}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Wave Background */}
        <div className="relative mt-24 h-32 overflow-hidden">
          <div className="absolute -bottom-24 w-full">
            <svg 
              viewBox="0 0 1440 320" 
              className="text-blue-50 w-full h-auto"
            >
              <path 
                fill="currentColor" 
                fillOpacity="1" 
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,122.7C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
      </motion.main>

   
    </div>
  );
}