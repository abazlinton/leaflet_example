const MapView = require('./views/map_view');
const SelectView = require('./views/select_view');
const CountryData = require('./models/country_data')
const BucketList = require('./models/bucket_list')

document.addEventListener('DOMContentLoaded', () => {

  countryData = new CountryData();
  countryData.getData();

  const bucketList = new BucketList('http://localhost:3000/api/bucket_list_countries')
  bucketList.bindEvents()

  const mapDiv = document.getElementById('map');
  const mapView = new MapView(mapDiv, [55.9533, -3.1883], 10);
  mapView.init();

  const countrySelect = document.getElementById('country-select')
  const countrySelectView = new SelectView(countrySelect)
  countrySelectView.bindEvents();

  const bucketListSelect = document.getElementById('bucket-list-select')
  const bucketListSelectView = new SelectView(bucketListSelect)
  bucketListSelectView.bindEvents();

});
