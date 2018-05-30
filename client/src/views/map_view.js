const leaflet = require('leaflet');

const MapView = function(divId, startCoords, startZoom){
  this.coords = startCoords;
  this.zoomLevel = startZoom;
  this.divId = divId;
  this.leafletMap = null;

}

MapView.prototype.init = function(){
  const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osm = new leaflet.TileLayer(osmUrl);

    this.leafletMap = leaflet.map(this.divId)
        .addLayer(osm)
        .setView(this.coords, this.zoomLevel);
}

module.exports = MapView;