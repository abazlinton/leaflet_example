const PubSub = require('../helpers/pub_sub')
const Request = require('../helpers/request')

const BucketList = function(url){
  this.url = url;
  this.list = [];
  this.request = null
}

BucketList.prototype.bindEvents = function (){
  this.request = new Request(this.url)
  PubSub.subscribe('CountryData:selected-country', (evt) => {
    this.add(evt.detail)
  })
}

BucketList.prototype.get = function(){

}

BucketList.prototype.add = function(country){
  this.list.push(country)
  this.request.post(country)
    .then((data) => {
      PubSub.publish('BucketList:update', data)
    })
}

module.exports = BucketList;