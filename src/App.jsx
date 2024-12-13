import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import FavoritesCard from './components/FavoritesCard';



const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  
  
  const apiKey = 'a4bc1fc3630755282b14bbe24e36b40a';

  
  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchWeatherDataByLocation = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data by location:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchWeatherData(city);
  };

  const addFavorite = (city) => setFavorites([...favorites, city]);

  const removeFavorite = (city) => setFavorites(favorites.filter((fav) => fav !== city));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        fetchWeatherDataByLocation(latitude, longitude);
      },
      (error) => console.error('Error getting location:', error)
    );
  }, []);



  return (
    <div>
      <h1>Weather Application</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>
      <button onClick={() => addFavorite(city)}>Add to Favorites</button>

      {weatherData && <WeatherCard weatherData={weatherData} />}
      {forecastData && <ForecastCard forecastData={forecastData} />}
      
      {favorites.length > 0 && <FavoritesCard favorites={favorites} removeFavorite={removeFavorite} />}
    </div>
  );
};

export default App;
