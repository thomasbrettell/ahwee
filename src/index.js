import $ from 'jquery'
import Backbone from 'backbone'
import _ from 'underscore'

const rootID = '#app-root';

let songsArray = [
  {title: 'Hiasd'},
  {title: 'cxiqq'},
  {title: 'czxk'}
]


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

var songsCollection = new SongsCollection([])

_.each(songsArray, function(song, index){
  console.log('!')
  songsCollection.add(new SongModel({title: song.title, id: index}))
})

console.log(songsCollection)

$(`${rootID}`).append('<ul></ul>')
var songsView = new SongsView({el: `${rootID} ul`, model: songsCollection})
songsView.render()