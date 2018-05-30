const PubSub = require('../helpers/pub_sub');

const SelectView = function(element){
  this.element = element;
}

SelectView.prototype.bindToEventWithDataMapper = function(eventName, dataMapper){
  PubSub.subscribe(eventName, (evt) => {
    const optionTexts = evt.detail.map(dataMapper)
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