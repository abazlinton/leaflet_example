const MapView = require('./views/map_view');

document.addEventListener('DOMContentLoaded', () => {
  const mapDiv = document.getElementById('map');
  const mapView = new MapView(mapDiv, [55.9533, -3.1883], 13);
  mapView.init();

});
