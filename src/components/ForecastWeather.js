import React, { useState, useEffect } from 'react';

import {BsClouds, BsCloudRainHeavy, BsWind, BsMoon, BsCloud, BsCloudSun, BsCloudRain, BsCloudSnow, BsCloudLightningRain, BsSun, BsCloudMoon} from 'react-icons/bs';

function ForecastWeather({ data }) {

  const [iconSize, setIconSize] = useState(50);

  const handleResize = () => {
    const newSize = window.innerWidth < 1023 ? 35 : 50;
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
        return <BsSun size={iconSize} className="m-3" />;
      case '02d':
        return <BsCloudSun size={iconSize} className="m-3" />;
      case '01n':
        return <BsMoon size={iconSize} className="m-3" />;
      case '02n':
        return <BsCloudMoon size={iconSize} className="m-3" />;
      case '03d':
      case '03n':
        return <BsCloud size={iconSize} className="m-3" />;
      case '04d':
      case '04n':      
        return <BsClouds size={iconSize} className="m-3" />;
      case '09d':
      case '09n':
        return <BsCloudRain size={iconSize} className="m-3" />;
      case '10d':
      case '10n':
        return <BsCloudRainHeavy size={iconSize} className="m-3" />;
      case '11d':
      case '11n':
        return <BsCloudLightningRain size={iconSize} className="m-3" />;
      case '13d':
      case '13n':
        return <BsCloudSnow size={iconSize} className="m-3" />;
      case 'iconSized':
      case 'iconSizen':
        return <BsWind size={iconSize} className="m-3" />;

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
            <div>
              <p>{item.main}</p>
              <p>{item.temp.toFixed(1)}°C</p>
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