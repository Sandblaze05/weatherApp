import React, { useEffect, useMemo, useState } from "react";
import { Sunrise, Sunset } from "lucide-react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { motion, AnimatePresence } from "framer-motion";

const WeatherContent = ({ weatherData, forecastData }) => {
  const [progress, setProgress] = useState(0);

  const getProgress = () => {
    const currentTime = new Date();
    const sunriseTime = forecastData.forecastday[0].astro.sunrise;
    const sunsetTime = forecastData.forecastday[0].astro.sunset;
    const year = currentTime.getFullYear();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    const day = currentTime.getDate().toString().padStart(2, "0");
    const sunrise = new Date(
      `${year}-${month}-${day}T${sunriseTime.slice(0, 5)}:00`
    );
    const sunset = new Date(
      `${year}-${month}-${day}T${(Number(sunsetTime.slice(0, 2)) + 12)
        .toString()
        .padStart(2, "0")}:${sunsetTime.slice(3, 5)}:00`
    );
    const dayProgress = Math.max(
      0,
      Math.min(100, ((currentTime - sunrise) / (sunset - sunrise)) * 100)
    );
    setProgress(dayProgress);
  };

  useMemo(() => getProgress(), [weatherData]);

  return (
    <div className="flex flex-col w-screen justify-center items-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg mt-4 flex flex-col sm:flex-row gap-4 w-[90%]"
        >
          <div className="flex flex-col w-[100%]">
            <h2 className="sm:text-3xl text-xl font-bold mb-2 text-nowrap w-fit">
              {weatherData.city}
            </h2>
            <div className="flex sm:items-center gap-4 sm:justify-start justify-between">
              <div className="flex flex-col">
                <p className="sm:text-6xl text-4xl font-bold">
                  {weatherData.temp_c} °C
                </p>
                <p className="text-sm mt-1">{weatherData.condition.text}</p>
                <p className="text-sm mt-auto">
                  UV: {weatherData.uv} • Wind: {weatherData.vis_km} km
                </p>
              </div>
              <img
                src={weatherData.condition.icon}
                alt={weatherData.condition.text}
                className="w-30 h-30 object-cover ml-0 sm:ml-4"
              />
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-center items-center p-4 mt-4 w-[100%] gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800 w-80 h-60 p-4 rounded-2xl flex flex-col justify-center items-center overflow-hidden"
          >
            <div className="relative w-full h-[60%]">
              <div className="w-[80%] h-fit absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10">
                <CircularProgressbarWithChildren
                  value={progress}
                  circleRatio={0.5}
                  strokeWidth={4}
                  styles={buildStyles({
                    rotation: 0.75,
                    strokeLinecap: "round",
                    trailColor: "#fff",
                    pathColor: "yellow",
                  })}
                >
                  {/* <div className="text-sm mt-2">{50}%</div> */}
                </CircularProgressbarWithChildren>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[40%] flex flex-col items-center justify-center">
                <div className="flex items-center justify-between w-[88%] h-[40%]">
                  <Sunrise color="#ffffff" />
                  <Sunset color="#ffffff" />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800 w-80 h-60 p-4 rounded-2xl"
          >
            yes
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default WeatherContent;
