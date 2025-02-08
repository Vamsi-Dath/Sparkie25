import { useState, useEffect } from "react";


function App() {

  //default location set to ARC starbucks
  const [lat, setLat] = useState(41.87458510527232); 
  const [lon, setLon] = useState(-87.65070210831874); 
  
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchWeather = async () => {

    setLoading(true);

    const response = await fetch(`http://127.0.0.1:8000/api/weather/?lat=${lat}&lon=${lon}`);
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

        <button onClick={fetchWeather}>Check Weather</button>
      </div>


      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {weather && weather.hourly && (
        
        <div>
          <h2>Location: {weather.latitude}, {weather.longitude}</h2>
          <h3>Temperature: {weather.hourly.temperature_2m[0]}°F</h3>
          <h3>Precipitation: {weather.hourly.precipitation[0]} mm</h3>
        </div>
      )}
    </div>
  );
}

export default App;
