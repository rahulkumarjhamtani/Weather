// API key
var key = "3265874a2c77ae4a04bb96236a642d2f";

var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');

// Weather API 
var url = (city) => 
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

async function getweather(city) {
    try {
        var resp = await fetch(url(city), {origin : "cors"});
        var respdata = await resp.json();
    } catch (error) {
        
        alert("Enter valid city");
    }
    
    
    addweather(respdata);
}

function addweather(data) {
    var weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = "";

    try {
        var temp = ktoc(data.main.temp);
        var min = ktoc(data.main.temp_min);
        var max = ktoc(data.main.temp_max);
        weather.innerHTML = 
        `<h2><img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" /> ${temp}°C <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" /></h2>
        
        <p>${data.weather[0].main}</p>
        <p>(${min}°C - ${max}°C)</p>
        <h3>Pressure : ${data.main.pressure}</h3>
        <h3>Humidity : ${data.main.humidity}</h3> 
        <h3>Visibility : ${data.visibility}</h3>
        <span>${data.name} ${data.sys.country}</span>
        `;
        // <p>${search.value}</p>
        
    } catch (error) {
        alert("Enter valid city");
    }
    
    main.innerHTML = '';

    main.appendChild(weather);
}

// convert kelvin to celcius
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

// loader
var preloader = document.getElementById("stop");
    function loadpage() {
        preloader.style.display = 'none';
    }