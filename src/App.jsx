import React, { useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import WeatherContent from "./components/WeatherContent";
import { Suspense } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = "https://api.weatherapi.com/v1/";

const App = () => {
  const [suggestion, setSuggestion] = useState([
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ]);
  const [selectedCity, setSelectedCity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setWeatherData(null);
      setForecastData(null);
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}forecast.json?key=${API_KEY}&q=${selectedCity}&aqi=no`
        );
        !response.ok &&
          console.error("Error fetching weather data:", response.statusText);
        const data = await response.json();
        console.log("Weather data:", data);
        setWeatherData({ ...data.current, city: data.location.name });
        setForecastData(data.forecast);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setWeatherData(null);
        setError(err);
      } finally {
        setSelectedCity("");
        setInputValue("");
        setLoading(false);
      }
    };
    if (selectedCity) {
      console.log(`Fetching weather data for ${selectedCity}`);
      fetchWeatherData();
    }
  }, [selectedCity]);

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue || "");
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <>
      <ProgressBar loading={loading} />
      <header className="sticky z-100 top-0 h-20 shadow-xl shadow-gray-800 bg-gray-800 w-screen p-4 flex justify-items-stretch">
        <h1 className="font-bold sm:text-3xl text-xl mt-3">
          Weather
          <span className="bg-gradient-to-br from-gray-400 to-gray-600 inline-block text-transparent bg-clip-text">
            App
          </span>
        </h1>
        <Autocomplete
          freeSolo
          options={suggestion}
          value={selectedCity}
          onChange={handleCityChange}
          onInputChange={handleInputChange}
          className="sm:w-[200px] sm:visible ml-auto"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cities"
              variant="standard"
              InputLabelProps={{
                style: { color: "#ccc" }, // Label text color
              }}
            />
          )}
          sx={{
            width: 200,
            "& .MuiInputBase-root": {
              color: "#f0f0f0", // Input text color
              backgroundColor: "transparent", // Dark gray background
              borderRadius: "6px",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "#555", // Default underline color
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "#888", // Hover underline
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "cyan", // Focus underline
            },
            "& .MuiSvgIcon-root": {
              color: "#ccc", // Icon color (dropdown arrow)
            },
            "& .MuiAutocomplete-clearIndicator": {
              color: "#ccc", // Clear (X) icon color
            },
            "& .MuiAutocomplete-popupIndicator": {
              color: "#ccc", // Dropdown arrow color
            },
            "& .MuiAutocomplete-option": {
              backgroundColor: "#2a2a2a",
              color: "#fff",
            },
          }}
        />
      </header>

      <div className="flex flex-col items-center justify-center mt-4 ">
        {!weatherData ? (
          <div className="text-transparent bg-gradient-to-r from-[#eee] from-40% via-[#9a9999] via-50% to-[#eee] to-60% bg-clip-text mt-4 bg-size-[300%] animate-shimmer" style={{ backgroundPositionX: '100%' }}>Select a city to see the weather</div>
        ) : (
          <WeatherContent
            weatherData={weatherData}
            forecastData={forecastData}
          />
        )}
      </div>
    </>
  );
};

export default App;
