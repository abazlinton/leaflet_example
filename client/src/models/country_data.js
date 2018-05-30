const Request = require('../helpers/request');
const PubSub = require('../helpers/pub_sub');

const CoutriesData = function () {
  this.countries = [];
};

CoutriesData.prototype.getData = function () {
  request.get()
    .then(data => this.handleDataReady(data));
  
    PubSub.subscribe('SelectView:change', (evt) => {
      const selectedIndex = evt.detail;
      const selectedCountry = this.countries[selectedIndex]
      PubSub.publish('CountryData:selected-country', selectedCountry);
  });
};

CoutriesData.prototype.handleDataReady = function (countries) {
  this.countries = countries;
  PubSub.publish('CoutriesData:load', this.countries);
};



module.exports = CoutriesData;
