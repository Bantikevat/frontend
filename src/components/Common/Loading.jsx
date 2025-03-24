import { motion } from "framer-motion";
import { FiHeart, FiActivity, FiDroplet } from "react-icons/fi";

// Basic Spinner with Animation
export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50"
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-20 h-20"
      >
        <div className="absolute inset-0 border-4 border-t-primary border-r-secondary border-b-purple-500 border-l-pink-500 rounded-full animate-spin"></div>
        <FiHeart className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
      </motion.div>
      
      <motion.p
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mt-6 text-xl font-semibold text-gray-600 flex items-center gap-2"
      >
        Analyzing Health Data
        <span className="animate-bounce">...</span>
      </motion.p>
    </motion.div>
  );
}