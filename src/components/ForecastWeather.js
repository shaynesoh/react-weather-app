import React from 'react';

import { ReactComponent as ClearDay } from '../assets/weather-icons-static/clear-day.svg';
import { ReactComponent as PartlySunny } from '../assets/weather-icons-static/partly-cloudy-day.svg';
import { ReactComponent as Cloudy } from '../assets/weather-icons-static/cloudy.svg';
import { ReactComponent as Drizzle } from '../assets/weather-icons-static/drizzle.svg';
import { ReactComponent as Rainy } from '../assets/weather-icons-static/rain.svg';
import { ReactComponent as Thunderstorm } from '../assets/weather-icons-static/thunderstorms.svg';
import { ReactComponent as Snow } from '../assets/weather-icons-static/snow.svg';
import { ReactComponent as Mist } from '../assets/weather-icons-static/mist.svg';
import { ReactComponent as ClearNight } from '../assets/weather-icons-static/clear-night.svg';
import { ReactComponent as PartlyNight } from '../assets/weather-icons-static/partly-cloudy-night.svg';

function ForecastWeather({ data }) {

  const renderIcon = (icon) => {
    switch (icon) {
      case '01d':
        return <ClearDay width={50} height={50} className="my-2" fill="#000" />;
      case '02d':
        return <PartlySunny width={50} height={50} className="my-2" fill="#000" />;
      case '01n':
        return <ClearNight width={50} height={50} className="my-2" fill="#000" />;
      case '02n':
        return <PartlyNight width={50} height={50} className="my-2" fill="#000" />;
      case '03d':
      case '03n':
        return <Cloudy width={50} height={50} className="my-2" fill="#000" />;
      case '04d':
      case '04n':
        return <Cloudy width={50} height={50} className="my-2" fill="#000" />;
      case '09d':
      case '09n':
        return <Drizzle width={50} height={50} className="my-2" fill="#000" />;
      case '10d':
      case '10n':
        return <Rainy width={50} height={50} className="my-2" fill="#000" />;
      case '11d':
      case '11n':
        return <Thunderstorm width={50} height={50} className="my-2" fill="#000" />;
      case '13d':
      case '13n':
        return <Snow width={50} height={50} className="my-2" fill="#000" />;
      case '50d':
      case '50n':
        return <Mist width={50} height={50} className="my-2" fill="#000" />;

      default:
        return null;
    }
  };

  const renderData = () => {
    return data.map((item) => {
      return (
        <div className="flex flex-row sm:flex-col items-center w-full sm:w-auto justify-between py-2" key={item.date || item.hour}>
          <p className="font-light text-sm">{item.date ? item.date : `${item.hour}:00`}</p>
          <div className="flex flex-col sm:flex-col items-center gap-x-4">
            {renderIcon(item.icon)}
            <div className="text-center">
              <p>{item.main}</p>
              <p className="font-semibold">{item.temp.toFixed(1)}°C</p>
            </div>
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