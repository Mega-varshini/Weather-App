import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("Chennai");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "8a305e77a24f12368b92a882a12ec4f3";

  const getWeather = async () => {
    if (city === "") return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found! Try Chennai, Mumbai, Delhi");
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🌤️ Weather Report App</h1>
      
      <div className="search-box">
        <input 
          type="text"
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
          onKeyPress={(e) => e.key === 'Enter' && getWeather()}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h3>{weather.main.temp}°C</h3>
          <p><b>Feels like:</b> {weather.main.feels_like}°C</p>
          <p><b>Weather:</b> {weather.weather[0].main} - {weather.weather[0].description}</p>
          <p><b>Humidity:</b> {weather.main.humidity}%</p>
          <p><b>Wind Speed:</b> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;