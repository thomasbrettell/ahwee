import * as $ from 'jquery'
import * as Backbone from 'backbone'
import * as _ from 'underscore'
import {carTemplate, boatTemplate} from '../templates/vehicleTemplate'

console.log($ ? '$ ✅' : '')
console.log(Backbone ? 'Backbone ✅' : '')
console.log(_ ? '_ ✅' : '')

const appRoot = $('#app-root')

appRoot.before(`
  <nav id='nav'>
    <a href='#cars'>Cars</a>
    <a href='#boats'>Boats</a>
  </nav>
`)

const CarModel = Backbone.Model.extend({})
const CarCollection = Backbone.Collection.extend({
  model: CarModel
})
const CarModelView = Backbone.View.extend({
  tagName: 'li',

  render: function() {
    let template = _.template(carTemplate())
    let html = template(this.model.toJSON())
    this.$el.html(html)

    return this
  }
})
const CarCollectionView = Backbone.View.extend({
  tagName: 'ul',
  render: function() {
    let self = this
    
    this.collection.each(function(car:Backbone.Model) {
      let carView = new CarModelView({model: car})
      self.$el.append(carView.render().$el)
    })
  }
})


const BoatModel = Backbone.Model.extend({})
const BoatCollection = Backbone.Collection.extend({
  model: BoatModel
})
const BoatModelView = Backbone.View.extend({
  tagName: 'li',

  render: function() {
    let template = _.template(boatTemplate())
    let html = template(this.model.toJSON())
    this.$el.html(html)

    return this
  }
})
const BoatCollectionView = Backbone.View.extend({
  tagName: 'ul',
  render: function() {
    let self = this
    
    this.collection.each(function(car:Backbone.Model) {
      let carView = new BoatModelView({model: car})
      self.$el.append(carView.render().$el)
    })
  }
})

const HomeView = Backbone.View.extend({
  render: function() {
    this.$el.html('Welcome to my site')
  }
})

const AppRouter = Backbone.Router.extend({
  routes: {
    'cars': 'viewCars',
    'boats': 'viewBoats',
    '*other': 'viewDefault'
  },

  viewCars: function() {
    let cars = new CarCollection([
      new CarModel({title: 'Yay car'}),
      new CarModel({title: 'Car2'})
    ])

    appRoot.html('')
    appRoot.append('<ul></ul>')
    let view = new CarCollectionView({el: appRoot.find('ul'), collection: cars})
    view.render()
  },
  viewBoats: function() {
    let boats = new BoatCollection([
      new BoatModel({title: 'Yay boat'}),
      new BoatModel({title: 'boat2'})
    ])

    appRoot.html('')
    appRoot.append('<ul></ul>')
    let view = new BoatCollectionView({el: appRoot.find('ul'), collection: boats})
    view.render()
  },

  viewDefault: function() {
    let view = new HomeView({el: appRoot})
    view.render()
  }
})

let router = new AppRouter()
Backbone.history.start()