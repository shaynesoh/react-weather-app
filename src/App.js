import "./App.css";
import { useState, useEffect } from "react";

import { ImSpinner8 } from "react-icons/im";
import SearchBar from "./components/SearchBar.js";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";
import fetchFormattedData from "./services/weatherApi";
import WeatherBackground from "./components/WeatherBackground";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [selectedTab, setSelectedTab] = useState("today");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeather = async () => {
    setIsLoading(true);
    setWeather(null);
    setErrorMessage("");
    try {
      const data = await fetchFormattedData({ q: location });
      setWeather(data);
    } catch (error) {
      setErrorMessage("Invalid input. Please try again.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  const fetchSearchResults = (searchResults) => {
    setLocation(searchResults);
  };

  const toggleTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="App flex items-center min-h-screen overflow-x-hidden py-5">
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50 flex items-center justify-center">
          <ImSpinner8 className="text-white animate-spin h-12 w-12" />
        </div>
      )}
      {weather && !isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-0">
          <WeatherBackground weather={weather} />
        </div>
      )}
      <div className="container mx-auto flex flex-col w-full py-10 z-10">
        <div className="max-w-screen h-fit rounded-xl mb-10 relative z-50 px-10">
          <SearchBar
            className="rounded-xl mb-10"
            onSubmit={fetchSearchResults}
            message={errorMessage}
          />
        </div>

        {weather && !isLoading && (
          <div className="flex flex-col z-10 px-10">
            <div className="pb-10">
              <CurrentWeather
                weather={weather}
              />
            </div>
            <div className="flex gap-5 mb-5 justify-center md:justify-start">
              <button
                className={`px-4 py-2 focus:outline-none ${selectedTab === 'today' ? 'bg-black text-white rounded-full' : ''}`}
                onClick={() => toggleTab('today')}
              >
                Today
              </button>
              <button
                className={`px-4 py-2 focus:outline-none ${selectedTab === 'week' ? 'bg-black text-white rounded-full' : ''}`}
                onClick={() => toggleTab('week')}
              >
                This week
              </button>
            </div>
            <div className="w-full flex flex-col justify-between">
              {selectedTab === 'today' &&
                <ForecastWeather
                  title="Today's forecast"
                  data={weather.hours}
                />
              }
              {selectedTab === 'week' &&
                <ForecastWeather
                  title="This week's forecast"
                  data={weather.days}
                />
              }
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
