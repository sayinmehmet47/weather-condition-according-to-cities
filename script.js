const form = document.querySelector('form');
const spinner = document.getElementById('spinner');
var inputs = document.querySelector('form').elements;
let error = document.querySelector('#error');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  city = inputs[0].value;

  console.log(city);
  spinner.removeAttribute('hidden');

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=11ea7806b2106aa86cdd4314c1187276`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        spinner.setAttribute('hidden', '');
        error.innerText = 'City is wrong';

        setInterval(() => {
          error.innerText = '';
        }, 2000);
      }
    })
    .then((data) => {
      spinner.setAttribute('hidden', '');
      console.log(data.name);
        const {lon,lat}=data.coord
      mapDisplay(lon,lat,data.main.temp,data.name)
    })
    .catch((error) => {
      console.log(error);
    });

});
mapDisplay=(lon,lat,temp,city)=>{
 
        console.log(city)
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2F5aW5tZWhtZXQ0NyIsImEiOiJja3ByZWN3d2YzM3A4MnBvODhmcm95N3UxIn0.V3Jz4WGICqwetae4kgj-8g';
     var map = new mapboxgl.Map({

    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [lon,lat], // starting position [lng, lat]
    zoom:5

    });
    var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat([lon,lat])
    .setHTML(`<h2>City:${city}</h2></br><h2>Tempeture:${Math.floor(temp-272.15)}°</h2>`)
    .addTo(map);  
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    map.doubleClickZoom.enable();

}

