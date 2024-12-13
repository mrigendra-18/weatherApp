

const WeatherCard = ({ weatherData }) => (
  <div className="weather-card">
    <h2>Current Weather in {weatherData.name}</h2>
    <p>Temperature: {weatherData.main.temp} °C</p>
    <p>Humidity: {weatherData.main.humidity} %</p>
    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    <p>Description: {weatherData.weather[0].description}</p>
  </div>
);

export default WeatherCard;
