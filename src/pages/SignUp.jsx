import React, { useState } from "react";
import { motion } from "framer-motion";

const SignUp = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        action=""
        className="flex flex-col gap-5 justify-center items-center border-1 border-slate-500 rounded-3xl p-4 w-90"
      >
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <input
          type="text"
          className="w-full bg-slate-600 rounded-md h-9 p-2 focus:border-0 focus:ring-0"
          placeholder="enter email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full bg-slate-600 rounded-md h-9 p-2"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <motion.div
          whileTap={{ scale: 0.96 }}
          className="w-full text-center bg-blue-50 text-gray-700 rounded-md py-2 border-2 border-gray-600 hover:shadow-lg hover:shadow-white/10 cursor-pointer"
        >
          Sign Up
        </motion.div>
      </form>
    </div>
  );
};

export default SignUp;
