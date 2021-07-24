import * as $ from 'jquery'
import * as Backbone from 'backbone'
import * as _ from 'underscore'
import {vehicleTemplate, newVehicleTemplate} from '../templates/vehicleTemplate'
import {person} from '../data/person'

console.log($ ? '$ ✅' : '')
console.log(Backbone ? 'Backbone ✅' : '')
console.log(_ ? '_ ✅' : '')

const appRoot = $('#app-root')

const VehicleModel = Backbone.Model.extend({})

const VehicleModelView = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click button[type=delete]': 'clickHandler'
  },

  clickHandler: function() {
    this.remove()
  },

  render: function() {
    let template = _.template(vehicleTemplate())
    let html = template(this.model.toJSON())
    this.$el.html(html)
    this.$el.attr('data-color', this.model.get('color'))

    return this
  }
})

const VehicleCollection = Backbone.Collection.extend({
  model: VehicleModel
})

const VehicleCollectionView = Backbone.View.extend({
  initialize: function(options:any) {
    this.bus = options.bus

    this.bus.on('vehicleAdded', this.onVehicleAdded, this)
  },

  onVehicleAdded: function(number:any) {
    let vehicle = new VehicleModel({ number: number });
		let vehicleModelView = new VehicleModelView({ model: vehicle });
		this.$el.prepend(vehicleModelView.render().$el);
    console.log(vehicles)
  },

  render: function() {
    let self = this

    this.model.each(function(vehicle:Backbone.Model) {
      let vehicleView = new VehicleModelView({model: vehicle})
      self.$el.append(vehicleView.render().$el)
    })
  }
})

const NewVehicleModel = Backbone.Model.extend({})

const NewVehicleView = Backbone.View.extend({
  el: 'div',

  events: {
    'click button[type="add"]': 'clickHandler'
  },

  clickHandler: function() {
    this.bus.trigger('vehicleAdded', this.$el.find('input').val())
    this.$el.find('input').val('')
  },

  initialize: function(options:any) {
    this.bus = options.bus
  },

  render: function() {
    let template = _.template(newVehicleTemplate())
    let html = template(this.model.toJSON())
    this.$el.html(html)

    return this
  }
})

let bus = _.extend({}, Backbone.Events) 

appRoot.append('<div id="vehicle-adder"></div>')
let newVehicleView = new NewVehicleView({el: '#vehicle-adder',model: new NewVehicleModel({}), bus: bus})
newVehicleView.render()

let vehicles = new VehicleCollection([
  new VehicleModel({number: 312, color: 'red'}),
  new VehicleModel({number: 40248, color: 'blue'})
])

appRoot.append('<ul></ul>')
let vehiclesCollectionView = new VehicleCollectionView({el: appRoot.find('ul'), model: vehicles, bus: bus})
vehiclesCollectionView.render()