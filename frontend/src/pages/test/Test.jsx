import { useState, useEffect } from "react";


function App() {

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    navigator.geolocation

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        setLat(userLat);
        setLon(userLon);

        fetchWeather(userLat, userLon); 
      },
      () => {
        setError("Location access denied. Please enable location services.");
      }
    );
     
  }, []);



  const fetchWeather = async (latitude, longitude) => {

    setLoading(true);
  
    const response = await fetch(`http://127.0.0.1:8000/api/weather/?lat=${latitude}&lon=${longitude}`);

    const data = await response.json();

    setWeather(data);

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Weather Forecast</h1>

      {}
      <div>
        <label>Latitude: </label>
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          step="0.01"
        />
        <label> Longitude: </label>
        <input
          type="number"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          step="0.01"
        />
        <button onClick={() => fetchWeather(lat, lon)}>Check Weather</button>
      </div>


      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}


      {weather && weather.current && (
        <div>
          <h2>📍Location: {lat}, {lon}</h2>

          <h3>🌡️ Temperature: {weather.current.temperature_2m}°F</h3>
          <h3>💧 Humidity: {weather.current.relative_humidity_2m}%</h3>
          <h3>🌧️ Precipitation: {weather.current.precipitation} mm</h3>
          <h3>☁️ Cloud Cover: {weather.current.cloud_cover}%</h3>
          <h3>💨 Wind Speed: {weather.current.wind_speed_10m} mph</h3>
        </div>
      )}
    </div>
  );
}

export default App;
