const apikey = "59096cb913a13c2195b35eb1d55ab16a";

const main = document.getElementById("important");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function findWeather(city) {
    const resp = await fetch(url(city), { origin: "self" });
    const respData = await resp.json();

    console.log(respData);

    showdata(respData);
}

function showdata(data) {
    const temp = conversion(data.main.temp);

    const weather = document.createElement("container");
    weather.classList.add("weather");

    weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" /></h2>
    <large>${data.weather[0].main}</large>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function conversion(temperature) {
    return Math.floor(temperature - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

    const city = search.value;

    if (city) {
        findWeather(city);
    }
});