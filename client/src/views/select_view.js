const PubSub = require('../helpers/pub_sub');

const SelectView = function(element){
  this.element = element;
}

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('CoutriesData:load', (evt) => {
    const optionTexts = evt.detail.map(country => country.name)
    this.render(optionTexts)
  })
}

SelectView.prototype.render = function(optionTexts) {

  optionTexts.forEach((optionText, index) => {
    const option = document.createElement('option')
    option.textContent = optionText;
    option.value = index;
    this.element.appendChild(option)
  })
  
}


module.exports = SelectView;