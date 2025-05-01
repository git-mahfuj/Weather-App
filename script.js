document.addEventListener("DOMContentLoaded", () => {

    const cityInput = document.getElementById("city-input");
    const weatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityData = document.getElementById("city-data");
    const windInfo = document.getElementById("wind-data");
    const temperatureInfo = document.getElementById("temperature-data");
    const weatherData = document.getElementById("description-data")
    const errorMessage = document.getElementById("error-message");
    const API_KEY = "a3439aedb5d96361ab8a164929146f4c";

    weatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) return;
        try {
            const weatherList = await fetchWeatherData(city)
            displayWeatherData(weatherList);

        } catch (error) {

            displayError();
        }

    });

    async function fetchWeatherData(city) {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log(response);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;

    };

    function displayWeatherData(data) {

        console.log(data);

        const { name, main, weather, wind } = data;
        cityData.textContent = name;
        temperatureInfo.textContent = `Temperature : ${main.temp} °C`;
        weatherData.textContent = `Weather : ${weather[0].description}`;
        windInfo.textContent = `Wind Speed : ${wind.speed} m/s`;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    };

    function displayError() {

        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }


})