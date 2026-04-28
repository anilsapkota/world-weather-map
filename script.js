const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//setting the current view to be temperature by default



function setView(view) {
    currentView = view;
    //Update the display based on the current view
    if(currentView === 'temperature'){
        document.getElementById('temperature').style.display = 'block';
        document.getElementById('condition').style.display = 'none';
    } else if (currentView === 'condition') {
        document.getElementById('temperature').style.display = 'none';
        document.getElementById('condition').style.display = 'block';
    }
}
//we need some mapping for the weather code to the condition so building the data structure 
const weatherDescriptions = {
    0: "Clear Sky ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅",
    3: "Overcast ☁️",
    51: "Light Drizzle 🌦️",
    61: "Rain 🌧️",
    71: "Snow 🌨️",
    95: "Thunderstorm ⛈️"
};

//adding the logic for clicking event in the map with built in from leaflet
map.on('click', function(e) {
    //console.log(e.latlng);
    //getting the lattitude and longitude from the map 
    const lat = e.latlng.lat
    const lng = e.latlng.lng

    //pass this lat and lng to the openmateo for weather
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;

    fetch(url)
        .then(response =>response.json())
        .then(data =>{
            console.log(data.current_weather)
            const temp = data.current_weather.temperature 
            const weather_code = data.current_weather.weathercode 
            //we are using the mapping to get the weather condition from the 
            document.getElementById('coords').textContent = ` Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`;
            document.getElementById('temperature').textContent = `Temperature: ${temp}°C`;
            document.getElementById('condition').textContent = `Condition: ${weatherDescriptions[weather_code] || "Unknown condition"}`;

        });
});

let currentView = 'temperature';