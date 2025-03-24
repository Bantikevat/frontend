import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation variants
const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const iconVariants = {
  hover: { scale: 1.2, rotate: 15, transition: { duration: 0.3 } },
  tap: { scale: 0.9 },
};

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={footerVariants}
      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12 border-t-2 border-primary/20"
    >
      <div className="container mx-auto text-center">
        <motion.p
          className="mb-6 text-lg font-light"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          © 2024 Health Tracker. All rights reserved.
        </motion.p>

        <div className="flex justify-center gap-6">
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaGithub size={28} className="hover:drop-shadow-glow" />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaLinkedin size={28} className="hover:drop-shadow-glow" />
          </motion.a>
        </div>

        {/* Animated border divider */}
        <motion.div
          className="mx-auto mt-8 w-24 h-1 bg-primary rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "backOut" }}
        />
      </div>
    </motion.footer>
  );
}