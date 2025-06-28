import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header className="sticky z-100 top-0 h-20 shadow-xl shadow-gray-800 bg-gray-800 w-screen p-4 flex justify-items-stretch">
        <h1 className="font-bold sm:text-3xl text-xl mt-3">
          Weather
          <span className="bg-gradient-to-br from-gray-400 to-gray-600 inline-block text-transparent bg-clip-text">
            App
          </span>
        </h1>
      </header>
      <div className="bg-gradient-to-b from-slate-950 from-60% to-transparent h-80 w-full relative">
        <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 sm:text-4xl text-3xl font-extrabold">
          <div className="text-center">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 0.9,
                webkitTextFillColor: "grey",
                transition: "colors",
              }}
              whileTap={{
                scale: 0.9,
                webkitTextFillColor: "grey",
                transition: "colors",
              }}
              // className="transition-colors"
            >
              {"Weather "}
            </motion.div>
          </div>
          <div className="text-center">at</div>{" "}
          <div className="text-nowrap">Your fingertips</div>
        </div>
        <motion.div 
          onClick={() => navigate('/signup')}
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.8 }}
          className="absolute cursor-pointer flex items-center justify-center w-fit bottom-0 left-1/2 transform -translate-x-1/2 rounded-full border-1 border-gray-300 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-500 px-5 py-2"
        >
          Sign Up
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
