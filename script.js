const btn = document.getElementById("search-btn");
const input = document.getElementById("city-input");
const data = document.getElementById("weather-data");

async function getData(cityName) {
  const promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=d663c7f2a16045df80e61255250604&q=${cityName}&aqi=yes`
  );
  return promise.json();
}

btn.addEventListener("click", async () => {
  const value = input.value.trim();
  if (!value) return;

  try {
    const result = await getData(value);

    if (result.error) {
      data.innerHTML = `<p style="color: red;">Record not found</p>`;
      data.classList.remove("weather-box");
    } else {
      data.innerHTML = `
        <h1>${result.location.name}, ${result.location.country}</h1>
        <p>Time: ${result.location.localtime}</p>
        <img src="https:${result.current.condition.icon}" alt="Weather icon">
        <p>Weather: ${result.current.condition.text}</p>
        <p>Temp: ${result.current.feelslike_c}°C</p>
        <div>
          <p>AQI - PM2.5: ${result.current.air_quality.pm2_5}</p>
          <p>AQI - PM10: ${result.current.air_quality.pm10}</p>
        </div>
      `;
      data.classList.add("weather-box");
    }
  } catch (error) {
    data.innerHTML = `<p style="color: red;">Error fetching data</p>`;
    data.classList.remove("weather-box");
  }
});
