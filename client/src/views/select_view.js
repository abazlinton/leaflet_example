// const PubSub = require('../helpers/pub_sub');

// const SelectView = function (element) {
//   this.element = element;
// }

// SelectView.prototype.bindEvents = function () {
//   PubSub.subscribe('CoutriesData:load', (evt) => {
//     const optionTexts = evt.detail.map(country => country.name)
//     this.render(optionTexts)
//   })
// }

// SelectView.prototype.render = function (optionTexts) {

//   optionTexts.forEach((optionText, index) => {
//     const option = document.createElement('option')
//     option.textContent = optionText;
//     option.value = index;
//     this.element.appendChild(option)
//   })

//   this.element.addEventListener('change', (evt) => {
//     PubSub.publish('SelectView:change', evt.target.value)
//   })

// }


// module.exports = SelectView;

const PubSub = require('../helpers/pub_sub');

const SelectView = function(element, name){
  this.element = element;
  this.name = name;
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

    this.element.addEventListener('change', (evt) => {
      console.log(this)
      PubSub.publish(`${this.name}:change`, evt.target.value)
  })
  
}


module.exports = SelectView;