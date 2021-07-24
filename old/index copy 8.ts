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
const CarCollection = Backbone.Model.extend({
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
    console.log(this.collection)
    
    this.collection.each(function(car:Backbone.Model) {
      console.log('!')
      let carView = new CarModelView({model: car})
      self.$el.append(carView.render().$el)
    })
  }
})


const BoatModel = Backbone.Model.extend({})
const BoatCollection = Backbone.Collection.extend({
  model: BoatModel
})

// const CarsView = Backbone.View.extend({
//   render: function() {
//     console.log(this.collection)
//     // let render = new CarCollectionView({model: cars})
//     // this.$el.html(render)

//     return this
//   }
// })

const BoatsView = Backbone.View.extend({
  render: function() {
    this.$el.html('BOATS VIEW')

    return this
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

    this.loadView(new CarCollectionView({el: appRoot, collection: cars}))
  },
  viewBoats: function() {
    let view = new BoatsView({el: appRoot})
    view.render()
  },

  loadView: function(view:any){
		// If the currentView is set, remove it explicitly.
		if (this._currentView) {
			this._currentView.remove();
		}

		appRoot.html(view.render().$el);
		
		this._currentView = view;
	},

  viewDefault: function() {
    let view = new HomeView({el: appRoot})
    view.render()
  }
})

let router = new AppRouter()
Backbone.history.start()