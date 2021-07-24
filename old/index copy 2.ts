import * as $ from 'jquery'
import * as Backbone from 'backbone'
import * as _ from 'underscore'
import {vehicleTemplate} from '../templates/vehicleTemplate'
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
  render: function() {
    let self = this

    this.model.each(function(vehicle:Backbone.Model) {
      let vehicleView = new VehicleModelView({model: vehicle})
      self.$el.append(vehicleView.render().$el)
    })
  }
})

let vehicles = new VehicleCollection([
  new VehicleModel({number: 312, color: 'red'}),
  new VehicleModel({number: 40248, color: 'blue'})
])

appRoot.append('<ul></ul>')
let vehiclesCollectionView = new VehicleCollectionView({el: appRoot.find('ul'), model: vehicles})
vehiclesCollectionView.render()