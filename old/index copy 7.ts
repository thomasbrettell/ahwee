import * as $ from 'jquery'
import * as Backbone from 'backbone'
import * as _ from 'underscore'

console.log($ ? '$ ✅' : '')
console.log(Backbone ? 'Backbone ✅' : '')
console.log(_ ? '_ ✅' : '')

const appRoot = $('#app-root')

appRoot.before(`
  <nav>
    <button data-url='artists'>Artists</button>
    <button data-url='albums'>Albums</button>
    <button data-url='genres'>Genres</button>
  </nav>
`)


var ArtistsView = Backbone.View.extend({
	render: function(){
		this.$el.html("ARTISTS VIEW");

		return this;
	}
});

var AlbumsView = Backbone.View.extend({
	render: function(){
		this.$el.html("ALBUMS VIEW");

		return this;
	}
});

var GenresView = Backbone.View.extend({
	render: function(){
		this.$el.html("GENRES VIEW");

		return this;
	}
});

var AppRouter = Backbone.Router.extend({
	routes: {
		"albums": "viewAlbums",
		"albums/:albumId": "viewAlbumById",
		"artists": "viewArtists",
		"genres": "viewGenres",
		"*other": "defaultRoute"
	},

	viewArtists: function(){
		var view = new ArtistsView({ el: appRoot });
		view.render();
	},

	viewGenres: function(){
		var view = new GenresView({ el: appRoot });
		view.render();
	},

	defaultRoute: function(){

	},

	viewAlbumById: function(albumId:any){

	},

	viewAlbums: function(){
		var view = new AlbumsView({ el: appRoot });
		view.render();
	}
});

var router = new AppRouter();
Backbone.history.start();

var NavView = Backbone.View.extend({
	events: {
		"click": "onClick"
	},

	onClick: function(e:any){
		var $li = $(e.target);
		router.navigate($li.attr("data-url"), { trigger: true });
	}
});

var navView = new NavView({ el: $('body').find('nav') });





