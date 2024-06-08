import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = () => {
        setLoading(true);
        setError('');
        setWeatherData(null);

        axios.get(`https://api.weatherapi.com/v1/current.json?key=6c2f551c3b9c4ed7814174213232908&q=${city}`)
            .then(response => {
                setWeatherData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch weather data');
                setLoading(false);
            });
    };

    return (
        <div className="weather-app">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading data…</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <h3>Temperature</h3>
                        <p>{weatherData.current.temp_c}°C</p>
                    </div>
                    <div className="weather-card">
                        <h3>Humidity</h3>
                        <p>{weatherData.current.humidity}%</p>
                    </div>
                    <div className="weather-card">
                        <h3>Condition</h3>
                        <p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="weather-card">
                        <h3>Wind Speed</h3>
                        <p>{weatherData.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
