import React, { useEffect, useMemo, useState } from "react";
import {
  Sunrise,
  Sunset,
  Droplets,
  Eye,
  Wind,
  Bubbles,
  Droplet,
  DropletOff,
  Thermometer,
} from "lucide-react";
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
    <div className="flex flex-col w-screen justify-center items-center mb-10">
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
        <div className="flex flex-col md:flex-row justify-center items-center p-4 mt-4 w-[100%] gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800 w-80 h-60 p-4 rounded-2xl flex flex-col justify-center items-center overflow-hidden shadow-lg"
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
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-gray-800 w-80 h-60 p-4 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-center h-10 border-b-gray-400 border-b-1 text-nowrap gap-1">
              <strong className="text-ellipsis">
                <Droplets className="inline" /> Precipitation
              </strong>
              <strong>
                {forecastData.forecastday[0].day.totalprecip_mm} mm
              </strong>
            </div>
            <div className="flex justify-between items-center h-10 border-b-gray-400 border-b-1 text-nowrap gap-1">
              <strong>
                <Eye className="inline" /> Visibility
              </strong>
              <strong>{forecastData.forecastday[0].day.avgvis_km} km</strong>
            </div>
            <div className="flex justify-between items-center h-10 border-b-gray-400 border-b-1 text-nowrap gap-1">
              <strong className="text-ellipsis">
                <Wind className="inline" /> Wind Speed (Max)
              </strong>
              <strong>
                {forecastData.forecastday[0].day.maxwind_kph} kmph
              </strong>
            </div>
            <div className="flex justify-between items-center h-10 border-b-gray-400 border-b-1 text-nowrap gap-1">
              <strong>
                <Bubbles className="inline" /> Humidity (Avg)
              </strong>
              <strong>{forecastData.forecastday[0].day.avghumidity}%</strong>
            </div>
            <div className="flex justify-between items-center h-10 border-b-gray-400 border-b-1 text-nowrap gap-1">
              <strong>
                <DropletOff className="inline" /> Will it rain
              </strong>
              <strong>
                {forecastData.forecastday[0].day.daily_chance_of_rain}%
              </strong>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="bg-gray-800 w-[90%] mt-4 h-60 p-4 rounded-2xl shadow-lg"
        >
          <div className="flex relative gap-3 h-full w-full">
            <div className="overflow-x-auto flex flex-row gap-3 min-w-full">
              {forecastData.forecastday[0].hour.map((day, idx) => (
                <div
                  key={idx}
                  className="flex flex-col min-w-[100px] h-full items-center bg-gray-700 py-3 rounded-md"
                >
                  <p className="text-sm mb-1">{day.time.slice(10, 16)}</p>
                  <img src={day.condition.icon} alt="condition" />
                  <div className="flex overflow-hidden w-full">
                    <Thermometer />
                    <p className="font-medium text-lg antialiased">
                      {day.temp_c}°C
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute w-5 h-full left-0 top-1/2 transform -translate-y-1/2 rounded-r-full bg-gray-800/80 p-3 backdrop-blur-xl flex justify-center items-center">
              {"<"}
            </div>
            <div className="absolute w-5 h-full right-0 top-1/2 transform -translate-y-1/2 rounded-l-full bg-gray-800/80 p-3 backdrop-blur-xl flex justify-center items-center">
              {">"}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WeatherContent;
