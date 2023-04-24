import "./App.css";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";

import SearchBar from "./components/SearchBar.js";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";
import fetchFormattedData from "./services/weatherApi";

const WeatherBackground = lazy(() => import('./components/WeatherBackground'));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [selectedTab, setSelectedTab] = useState("today");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeather = useCallback(async () => {
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
  }, [location]);
  
  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location, fetchWeather]);
  

  const fetchSearchResults = (searchResults) => {
    setLocation(searchResults);
  };

  const toggleTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="App flex items-center min-h-screen overflow-x-hidden py-5 px-10">
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50 flex items-center justify-center">
          <span className="text-white h-12 w-12 spinner"></span>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        {weather && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-0">
            <WeatherBackground weather={weather} />
          </div>
        )}
      </Suspense>
      <div className="container mx-auto flex flex-col w-full py-10 z-10">
        <div className="max-w-screen h-fit rounded-xl mb-10 relative z-50">
          <SearchBar
            className="rounded-xl mb-10"
            onSubmit={fetchSearchResults}
            message={errorMessage}
          />
        </div>

        {weather && (
          <div className="flex flex-col z-10">
            <div className="pb-10">
              <CurrentWeather
                weather={weather}
              />
            </div>
            <div className="flex gap-5 mb-5 justify-center lg:justify-start">
              <button
                className={`px-4 py-2 focus:outline-none ${selectedTab === 'today' ? 'bg-black text-white rounded-full' : ''}`}
                onClick={() => toggleTab('today')}
                aria-label="weather forecast tab for today"
              >
                Today
              </button>
              <button
                className={`px-4 py-2 focus:outline-none ${selectedTab === 'week' ? 'bg-black text-white rounded-full' : ''}`}
                onClick={() => toggleTab('week')}
                aria-label="weather forecast tab for this week"
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
