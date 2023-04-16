import React, { useState, useEffect } from 'react';

import { ReactComponent as ClearDay } from '../assets/weather-icons/clear-day.svg';
import { ReactComponent as PartlySunny } from '../assets/weather-icons/partly-cloudy-day.svg';
import { ReactComponent as Cloudy } from '../assets/weather-icons/cloudy.svg';
import { ReactComponent as Drizzle } from '../assets/weather-icons/drizzle.svg';
import { ReactComponent as Rainy } from '../assets/weather-icons/rain.svg';
import { ReactComponent as Thunderstorm } from '../assets/weather-icons/thunderstorms.svg';
import { ReactComponent as Snow } from '../assets/weather-icons/snow.svg';
import { ReactComponent as Mist } from '../assets/weather-icons/mist.svg';
import { ReactComponent as ClearNight } from '../assets/weather-icons/clear-night.svg';
import { ReactComponent as PartlyNight } from '../assets/weather-icons/partly-cloudy-night.svg';

import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

const CurrentWeather = ({ weather }) => {
  const [iconSize, setIconSize] = useState(75);

  const handleResize = () => {
    const newSize = window.innerWidth < 1023 ? 200 : 75;
    setIconSize(newSize);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderIcon = (icon) => {

    switch (icon) {
      case '01d':
        return <ClearDay width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '02d':
        return <PartlySunny width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '01n':
        return <ClearNight width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '02n':
        return <PartlyNight width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '03d':
      case '03n':
        return <Cloudy width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '04d':
      case '04n':
        return <Cloudy width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '09d':
      case '09n':
        return <Drizzle width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '10d':
      case '10n':
        return <Rainy width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '11d':
      case '11n':
        return <Thunderstorm width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '13d':
      case '13n':
        return <Snow width={iconSize} height={iconSize} className="my-2" fill="#000" />;
      case '50d':
      case '50n':
        return <Mist width={iconSize} height={iconSize} className="my-2" fill="#000" />;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-x-2">
        <div>
          <div className="flex flex-col lg:flex-row items-center gap-y-2 gap-x-2">
            <p className="w-max font-light text-normal rounded-full">
              {new Date(weather.dt * 1000).toLocaleString()}{" "}
            </p>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-8xl uppercase font-semibold tracking-tighter text-center lg:text-left">{weather.name}</h1>
          <div className="flex flex-col lg:flex-row items-center gap-x-5 gap-y-2">
            {renderIcon(weather.icon)}
            <p className="font-medium text-6xl md:text-7xl lg:text-8xl blackspace-nowrap">
              {weather.temp}<span className="font-extralight">°C</span>
            </p>
            <div className="flex flex-row justify-center items-center gap-x-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2 ">
                  <BsArrowUp />
                  <p className="font-light text-lg lg:text-xl blackspace-nowrap">
                    Max: <span className="font-semibold">{weather.temp_max.toFixed(1)}</span>°C
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <BsArrowDown />
                  <p className="font-light text-lg lg:text-xl blackspace-nowrap">
                    Min: <span className="font-semibold">{weather.temp_min.toFixed(1)}</span>°C
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-light text-lg lg:text-xl blackspace-nowrap">
                  Humidity: <span className="font-semibold">{weather.speed.toFixed(1)}</span>%
                </p>
                <p className="font-light text-lg lg:text-xl blackspace-nowrap">
                  Wind: <span className="font-semibold">{weather.humidity.toFixed(1)}</span>m/s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default CurrentWeather;