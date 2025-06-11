import React, { useEffect, useState } from "react";

const ProgressBar = ({ loading }) => {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowBar(true);
    } else {
      const timeout = setTimeout(() => setShowBar(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    showBar && (
      <div
        className={`absolute w-screen h-1 mt-0 p-0 ${!loading ? "hidden" : ""}`}
      >
        <div className="bg-cyan-400 h-1 transition-all animate-progress ease-in-out "></div>
      </div>
    )
  );
};

export default ProgressBar;
