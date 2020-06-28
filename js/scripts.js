window.onload = function() {
  const map = initMap();

  getBreweryData().then(breweries => {
    breweries.forEach(brewery => {
      addBreweryMarker(map, brewery);
    });
  });
}

/*
 * Basis setup voor de map, hierin wordt de kaart geinitialiseerd
 */
function initMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGhyZWFrIiwiYSI6ImNrYnJ3ejhpcTMwaTAzMHBqcGp3YzIxaWIifQ.lKOw0OZh4sENSxZq0ckVsg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-149.768580, 61.195963], // starting position as [lng, lat]
    zoom: 11
  });

  return map;
}

/**
 * Haalt  brouwerij gegevens op uit Anchorage
 */
async function getBreweryData() {
  let response = await fetch('https://api.openbrewerydb.org/breweries?by_city=Anchorage');
  let breweries = await response.json();

  return breweries;
}

/**
 * Voeg een marker aan de map mee, voor het aan meegegeven brouwerij,
 */
function addBreweryMarker(map, brewery) {
  let coordinates = [brewery.longitude, brewery.latitude];

  let poopupHTML = `<div class="flex-container">` +
                      `<h4>${brewery.name}</h4>` +
                      `Adress: ${brewery.street}, ${brewery.city} </br>` +
                      `Number: ${brewery.phone} </br>` +
                      `Brewery Type: ${brewery.brewery_type} </br>` +

                   `</div>`;

  // Maakt de popup aan
  let popup = new mapboxgl.Popup({offset: 25}).setHTML(poopupHTML).addTo(map);

  let markerElement = document.createElement('div');
  markerElement.classname = 'marker';

  // Maak de marker aan en voeg de popup toe
  let marker = new mapboxgl.Marker(markerElement).setLngLat(coordinates).addTo(map).setPopup(popup);

  // Sluit de popup zodra de map laad
  marker.togglePopup();

}
