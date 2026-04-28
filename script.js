const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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

        });
});