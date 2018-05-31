const leaflet = require('leaflet');
const PubSub = require('../helpers/pub_sub')

const MapView = function (divId, coords, zoomLevel) {
  this.divId = divId;  
  this.coords = coords;
  this.zoomLevel = zoomLevel;
  this.leafletMap = null;
}

MapView.prototype.init = function () {
  const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osm = new leaflet.TileLayer(osmUrl);

  this.leafletMap = leaflet.map(this.divId)
    .addLayer(osm)
    .setView(this.coords, this.zoomLevel);
}

MapView.prototype.bindEvents = function () {
  PubSub.subscribe('CountryData:selected-country', (evt) => {
    const lat = evt.detail.latlng[0]
    const lng = evt.detail.latlng[1]
    const bounds = this.guessBoundsFromAreaAndLatLng(evt.detail.area, lat, lng)
    this.fitBounds(bounds)
    this.addMarker(lat, lng)
  })
}

MapView.prototype.guessBoundsFromAreaAndLatLng = function (area, lat, lng) {
  const countryWidthGuess = Math.sqrt(area)
  const degInKm = 111;
  const topLeftLat = lat - countryWidthGuess / degInKm / 2
  const topLeftLng = lng - countryWidthGuess / degInKm / 2
  const bottomRightLat = topLeftLat + countryWidthGuess / degInKm
  const bottomRightLng = topLeftLng + countryWidthGuess / degInKm
  return [[topLeftLat, topLeftLng], [bottomRightLat, bottomRightLng]]
}

MapView.prototype.goTo = function (lat, lng) {
  this.leafletMap.setView([lat, lng]);
}

MapView.prototype.fitBounds = function (corners) {
  this.leafletMap.fitBounds(corners)
}

MapView.prototype.addMarker = function (lat, lng) {
  leaflet.marker([lat, lng]).addTo(this.leafletMap);
}

module.exports = MapView;