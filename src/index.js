import $ from 'jquery'
import Backbone from 'backbone'

console.log('hello')

const rootID = '#app-root';

var SongModel = Backbone.Model.extend()

var SongsCollection = Backbone.Collection.extend({
  model: SongModel
})

var SongView = Backbone.View.extend({

  tagName: 'h1',

  render: function() {
    console.log(this)

    this.$el.html(this.model.get('title'))

    return this
  }
})

var SongsView = Backbone.View.extend({
  render: function() {
    var self = this

    this.model.each(function(SongModel) {
      var songView = new SongView({model:SongModel})
      self.$el.append(songView.render().$el)
    })
  }
})

var songsCollection = new SongsCollection([
  new SongModel({title: 'yayoh', id: 1}),
  new SongModel({title: 'yaywooo', id: 2}),
  new SongModel({title: 'yayhooray', id: 3})
])

console.log(songsCollection)

$(`${rootID}`).append('<ul></ul>')
var songsView = new SongsView({el: `${rootID} ul`, model: songsCollection})
songsView.render()