import React, { useState } from "react";
import "./Weather.css";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import humidity_icon from "./assets/humidity.png";
import rain_icon from "./assets/rain.png";
import search_icon from "./assets/search.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";

const Weather = () => {
  let api_key = "0cf62e931cf38890dd290a003d9696df";
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-percent");
    const tem = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-Location");
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = data.wind.speed + "km/h";
    tem[0].innerHTML = Math.floor(data.main.temp)+"°C";
    location[0].innerHTML = data.name;

    // Updating weather icon based on weather condition
    switch (data.weather[0].icon) {
      case "01d":
        setWeatherIcon(clear_icon);
        break;
      case "01n":
        setWeatherIcon(clear_icon);
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        setWeatherIcon(cloud_icon);
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        setWeatherIcon(rain_icon);
        break;
      case "11d":
      case "11n":
        setWeatherIcon(drizzle_icon);
        break;
      case "13d":
      case "13n":
        setWeatherIcon(snow_icon);
        break;
      default:
        setWeatherIcon(cloud_icon);
    }
  };

  return (
    <>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="Search" />
          <div className="search-icon" onClick={() => search()}>
            <img src={search_icon} alt="Search" />
          </div>
        </div>
        <div className="weather-image">
          <img src={weatherIcon} alt="Weather" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-Location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="Humidity" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="Wind" className="icon" />
            <div className="data">
              <div className="wind-percent">18km/h</div>
              <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
