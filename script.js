var key = "3265874a2c77ae4a04bb96236a642d2f";

var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');

var url = (city) => 
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

async function getweather(city) {
    var resp = await fetch(url(city), {origin : "cors"});
    var respdata = await resp.json();

    addweather(respdata);
}

function addweather(data) {
    var temp = ktoc(data.main.temp);

    var weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = 
    `<h2>${temp}°C</h2>
    <p>${search.value}</p>
    `;

    main.innerHTML = '';

    main.appendChild(weather);
}

function ktoc(k) {
    return (k - 273.15).toFixed(2);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    var city = search.value;
    if (city) {
        getweather(city);
    }
});