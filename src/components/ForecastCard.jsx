

const ForecastCard = ({ forecastData }) => (
  <div className="forecast-card">
    <h2>5-Day Forecast</h2>
    {forecastData.list.map((item, index) => (
      <div key={index}>
        <p>{new Date(item.dt * 1000).toLocaleDateString()} - Temp: {item.main.temp} °C</p>
      </div>
    ))}
  </div>
);

export default ForecastCard;
