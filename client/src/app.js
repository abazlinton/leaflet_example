const MapView = require('./views/map_view');
const SelectView = require('./views/select_view');
const CountryData = require('./models/country_data')

document.addEventListener('DOMContentLoaded', () => {

  countryData = new CountryData();
  countryData.getData();

  const mapDiv = document.getElementById('map');
  const mapView = new MapView(mapDiv, [55.9533, -3.1883], 10);
  mapView.init();

  const countrySelect = document.getElementById('country-select')
  const countrySelectView = new SelectView(countrySelect)
  countrySelectView.bindEvents();

});
