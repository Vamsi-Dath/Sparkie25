import { useState, useEffect } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setError("Location access denied. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/weather/?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Weather Forecast</h1>
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
