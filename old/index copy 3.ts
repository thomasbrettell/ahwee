import * as $ from 'jquery'
import * as Backbone from 'backbone'
import * as _ from 'underscore'
import {vehicleTemplate} from '../templates/vehicleTemplate'
import {person} from '../data/person'

console.log($ ? '$ ✅' : '')
console.log(Backbone ? 'Backbone ✅' : '')
console.log(_ ? '_ ✅' : '')

const appRoot = $('#app-root')

appRoot.append(`
  <div id="venues-container"></div>
  <div id="map-container">
      <span id="venue-name"></span>
  </div>
`)

const VenueModel = Backbone.Model.extend({});

const VenueModelView = Backbone.View.extend({
	tagName: "li",

  initialize: function(options:any) {
    this.bus = options.bus
  },

	events: {
		"click": "onClick",
	},

	onClick: function(){
    this.bus.trigger('venueSelected', this.model)
	},

	render: function(){
		this.$el.html(this.model.get("name"));

		return this;
	}
});

const VenueCollection = Backbone.Collection.extend({
	model: VenueModel
});

const VenueCollectionView = Backbone.View.extend({
	tagName: "ul",

	id: "venues",

  initialize: function(options:any) {
    this.bus = options.bus
  },

	render: function(){
		let self = this;

		this.model.each(function(venue:any){
			let view = new VenueModelView({ model: venue, bus: self.bus });
			self.$el.append(view.render().$el);
		});

		return this;
	}
});

const MapView = Backbone.View.extend({
	el: "#map-container",

  initialize: function(options:any) {
    this.bus = options.bus

    this.bus.on('venueSelected', this.onVenueSelected, this)
  },

  onVenueSelected: function(venue:any){
    this.model = venue
    this.render()
  },

	render: function(){
		if (this.model)
			this.$("#venue-name").html(this.model.get("name"));

		return this;
	}
})

let bus = _.extend({}, Backbone.Events)

let venues = new VenueCollection([
	new VenueModel({ name: "30 Mill Espresso" }),
	new VenueModel({ name: "Platform Espresso" }),
	new VenueModel({ name: "Mr Foxx" })
]);

let venuesView = new VenueCollectionView({ model: venues, bus: bus});
$("#venues-container").html(venuesView.render().$el);

let mapView = new MapView({ bus: bus });
mapView.render();