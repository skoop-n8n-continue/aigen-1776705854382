document.addEventListener('DOMContentLoaded', () => {
    // Clock and Date
    const updateTime = () => {
        const now = new Date();
        const clockElement = document.getElementById('clock');
        const dateElement = document.getElementById('current-date');

        // Time format: 12:00 PM
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        clockElement.textContent = now.toLocaleTimeString('en-US', timeOptions);

        // Date format: Wednesday, April 22, 2026
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    };

    setInterval(updateTime, 1000);
    updateTime();

    // Weather Data Simulation
    const weatherData = {
        city: 'London',
        temp: 24,
        condition: 'Partly Cloudy',
        icon: '⛅',
        high: 26,
        low: 18,
        uv: 4,
        wind: 12,
        windDir: 'NW',
        humidity: 65,
        visibility: 10,
        aqi: 22,
        forecast: [
            { day: 'Thu', icon: '☀️', temp: 27 },
            { day: 'Fri', icon: '🌧️', temp: 21 },
            { day: 'Sat', icon: '⛅', temp: 23 },
            { day: 'Sun', icon: '☀️', temp: 25 },
            { day: 'Mon', icon: '☁️', temp: 22 }
        ]
    };

    const updateUI = () => {
        document.getElementById('city-name').textContent = weatherData.city;
        document.getElementById('current-temp').textContent = weatherData.temp;
        document.getElementById('weather-desc').textContent = weatherData.condition;
        document.getElementById('weather-icon').textContent = weatherData.icon;
        document.querySelector('.temp-range span:first-child').textContent = `H: ${weatherData.high}°`;
        document.querySelector('.temp-range span:last-child').textContent = `L: ${weatherData.low}°`;

        document.getElementById('uv-index').textContent = weatherData.uv;
        document.querySelector('.uv-progress').style.width = `${(weatherData.uv / 11) * 100}%`;

        document.getElementById('wind-speed').textContent = weatherData.wind;
        document.getElementById('wind-dir').textContent = weatherData.windDir;

        document.getElementById('humidity').textContent = `${weatherData.humidity}%`;
        document.getElementById('visibility').textContent = weatherData.visibility;

        document.getElementById('aqi').textContent = weatherData.aqi;

        // Forecast
        const forecastList = document.getElementById('forecast-list');
        forecastList.innerHTML = '';
        weatherData.forecast.forEach(item => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-day">${item.day}</div>
                <div class="forecast-icon">${item.icon}</div>
                <div class="forecast-temp">${item.temp}°</div>
            `;
            forecastList.appendChild(forecastItem);
        });
    };

    // Subtle random data updates to make it feel "live"
    const simulateLiveUpdates = () => {
        // Temperature fluctuation
        if (Math.random() > 0.7) {
            weatherData.temp += (Math.random() > 0.5 ? 1 : -1);
            if (weatherData.temp > 30) weatherData.temp = 30;
            if (weatherData.temp < 15) weatherData.temp = 15;
        }

        // Wind speed fluctuation
        if (Math.random() > 0.5) {
            weatherData.wind += (Math.random() > 0.5 ? 1 : -1);
            if (weatherData.wind < 0) weatherData.wind = 0;
            if (weatherData.wind > 40) weatherData.wind = 40;
        }

        // AQI fluctuation
        if (Math.random() > 0.8) {
            weatherData.aqi += (Math.random() > 0.5 ? 1 : -1);
            if (weatherData.aqi < 5) weatherData.aqi = 5;
            if (weatherData.aqi > 150) weatherData.aqi = 150;
        }

        updateUI();
    };

    updateUI();
    setInterval(simulateLiveUpdates, 10000); // Update every 10 seconds

    // Weather Condition Rotation (Optional: for visual variety in signage)
    const conditions = [
        { condition: 'Sunny', icon: '☀️', temp: 28 },
        { condition: 'Partly Cloudy', icon: '⛅', temp: 24 },
        { condition: 'Cloudy', icon: '☁️', temp: 21 },
        { condition: 'Light Rain', icon: '🌦️', temp: 19 }
    ];

    let conditionIndex = 1; // Start with Partly Cloudy
    const rotateConditions = () => {
        conditionIndex = (conditionIndex + 1) % conditions.length;
        const newCondition = conditions[conditionIndex];

        weatherData.condition = newCondition.condition;
        weatherData.icon = newCondition.icon;
        // Don't jump temp too much, just nudge it
        weatherData.temp = Math.round((weatherData.temp + newCondition.temp) / 2);

        updateUI();
    };

    // Rotate conditions every 2 minutes for visual interest on signage
    setInterval(rotateConditions, 120000);
});
