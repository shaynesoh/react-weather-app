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

function ForecastWeather({ data }) {
  const [iconSize, setIconSize] = useState(75);

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
        return;
    }
  };

  const renderData = () => {
    return data.map((item) => {
      return (
        <div className="flex flex-row sm:flex-col items-center w-full sm:w-auto justify-between" key={item.date || item.hour}>
          <p className="font-light text-sm">{item.date ? item.date : `${item.hour}:00`}</p>
          <div className="flex flex-row sm:flex-col items-center gap-x-4">
            {renderIcon(item.icon)}
            <p>{item.main}</p>
            <p>{item.temp.toFixed(1)}°C</p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="text-black">
        <hr className="mb-5 border-black" />
        <div className="flex flex-col sm:flex-row items-center justify-around">{renderData()}</div>
      </div>
    </>
  );
}


export default ForecastWeather;