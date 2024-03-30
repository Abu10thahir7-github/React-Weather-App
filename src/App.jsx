import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [place, setPlace] = useState("");
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [img, setImg] = useState(null);
  const apiKey = "0cd1801469e2e4e305146ba45ff15aee";
  const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${apiKey}`;
  const currentTime = new Date().toLocaleTimeString();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchData();
    }
  };

  const imgSearch = (icon) => {
    const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    setImg(imgUrl);
  };

  const searchData = () => {
    if (place === "") {
      setError("Please enter a place");
      setWeatherData(null);
    } else {
      fetch(`${url}&q=${place}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(place + " is not Place. Please try again.");
          }
          return res.json();
        })
        .then((data) => {
          setWeatherData(data);
          setError("");
          const icon = data.weather[0].icon;
          imgSearch(icon);

          if (data.cod === "404") {
            setError(data.message);
          }
        })
        .catch((err) => setError(err.message), setWeatherData(null));
      setPlace("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={place}
          onChange={(event) => setPlace(event.target.value)}
          placeholder="Enter a location"
          type="text"
          onKeyPress={handleKeyPress}
        />
        <button onClick={searchData}>
          <SearchIcon />
        </button>
      </div>
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      {weatherData && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weatherData.name}</p>
            </div>
            <div className="temp">
              <h1>{weatherData.main.temp}&deg;C</h1>
            </div>
            <div className="descri">
              <p>{weatherData.weather[0].main}</p>
            </div>
          </div>
          <div className="mid">
            <div className="left">
              <div className="des">
                <p>{weatherData.weather[0].description}</p>
              </div>
              <div className="time">
                <p>{currentTime}</p>
              </div>
            </div>
            <div className="right">
              <div className="imgData">
                <img src={img} alt="" />
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{weatherData.main.feels_like}&deg;C</p>
              <p>Feels like</p>
            </div>
            <div className="humdity">
              <p className="bold">{weatherData.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{weatherData.wind.speed} MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
