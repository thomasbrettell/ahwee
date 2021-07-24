import * as $ from 'jquery'
import * as Backbone from 'backbone'
import * as _ from 'underscore'

console.log($ ? '$ ✅' : '')
console.log(Backbone ? 'Backbone ✅' : '')
console.log(_ ? '_ ✅' : '')

const appRoot = $('#app-root')

appRoot.append(`
  <nav>
    <button data-url='artists'>Artists</button>
    <button data-url='albums'>Albums</button>
    <button data-url='genres'>Genres</button>
  </nav>
`)

const ArtistsView = Backbone.View.extend({
  render: function() {
    this.$el.htm('ARTISTS VIEW')

    return this
  }
})

const AlbumsView = Backbone.View.extend({
  render: function() {
    this.$el.htm('ALBUMS VIEW')

    return this
  }
})

const GenresView = Backbone.View.extend({
  render: function() {
    this.$el.htm('GENRES VIEW')

    return this
  }
})

const AppRouter = Backbone.Router.extend({
  routers: {
    'artists': 'viewArtists',
    'albums': 'viewAlbums',
    'genres': 'viewGenres',
    '*other': 'viewDefault'
  },

  viewArtists: function() {
    let view = new ArtistsView({el: '#container'})
    view.render()
  },

  viewDefault: function() {
    let view = new ArtistsView({el: appRoot})
    view.render()
  }
})

let router = new AppRouter()
Backbone.history.start()

const NavView = Backbone.View.extend({
  events: {
    'click': 'clickHanlder'
  },

  clickHandler: function(e:any) {
    console.log('ok')
    let $el = $(e.target)
    console.log($el.attr('data-url'))
    router.navigate($el.attr('data-url'), {trigger: true})
  }
})

let navView = new NavView({el: appRoot.find('nav')})
navView.render()

// router.navigate('artists', {trigger: true})
