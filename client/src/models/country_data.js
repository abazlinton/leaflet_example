const Request = require('../helpers/request');
const PubSub = require('../helpers/pub_sub');

const CoutriesData = function () {
  this.countries = [];
};

CoutriesData.prototype.getData = function () {
  const request = new Request('https://restcountries.eu/rest/v2/all');
  request.get()
    .then(data => this.handleDataReady(data));
};

CoutriesData.prototype.handleDataReady = function (countries) {
  this.countries = countries;
  PubSub.publish('CoutriesData:load', this.countries);
};



module.exports = CoutriesData;