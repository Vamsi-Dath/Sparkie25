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
        }
      );

 []);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);

      const response = await fetch(`http://127.0.0.1:8000/api/weather/?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      setWeather(data);

    setLoading(false);
  };


}

export default App;

