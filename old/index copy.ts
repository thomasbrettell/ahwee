import * as $ from 'jquery'
import * as Backbone from 'backbone'
import * as _ from 'underscore'

console.log($ ? '$ ✅' : '')
console.log(Backbone ? 'Backbone ✅' : '')
console.log(_ ? '_ ✅' : '')

const appRoot = $('#app-root')

const SongModel = Backbone.Model.extend({
  defaults: {
    listeners: 1
  }
})

const SongCollection = Backbone.Collection.extend({
  model: SongModel,

})

const SongView = Backbone.View.extend({

  tagName: 'li',

  className: 'song',

  attributes: {
    'data-genre': 'jazz'
  },

  events: {
    'click button': 'clickHandler',
  },

  clickHandler: function(e:any) {
    this.model.set('listeners', this.model.get('listeners')+1)
  },

  initialize: function() {
    this.model.on('change', this.render, this)
  },

  render: function() {
    this.$el.html(`${this.model.get('title')} has ${this.model.get('listeners')} listenders <button>listen</button>`)
    this.$el.attr('id', this.model.id)

    return this
  }
})

const SongsView = Backbone.View.extend({
  tagName: 'span',

  onSongAdded: function(song:any) {
    let songView = new SongView({model: song})

    this.$el.append(songView.render().$el)
  },

  onSongRemoved: function(song:any) {
    $(`#${song.id}`).remove()
  },

  initialize: function() {
    this.model.on('add', this.onSongAdded, this)
    this.model.on('remove', this.onSongRemoved, this)
  },

  render: function() {
    let self = this
    this.model.each(function(song:Backbone.Model) {
      let songView = new SongView({model: song})
      self.$el.append(songView.render().$el)
    })
  }
})

let songs = new SongCollection([
  new SongModel({id: 1,title: 'Yay'}),
  new SongModel({id: 2,title: 'Very cool song'}),
  new SongModel({id: 3,title: 'Yummy'}),
  new SongModel({id: 4,title: 'Very uncool'}),
])

appRoot.append('<ul></ul>')

let songsView = new SongsView({el: appRoot.find('ul'), model: songs})
songsView.render()