import * as $ from 'jquery'
import * as Backbone from 'backbone'
import * as _ from 'underscore'

console.log($ ? '$ ✅' : '')
console.log(Backbone ? 'Backbone ✅' : '')
console.log(_ ? '_ ✅' : '')

const appRoot = $('#app-root')

const SongModel = Backbone.Model.extend({})

const SongView = Backbone.View.extend({
  render: function() {
    let template = _.template($('#songTemplate').html())
    let html = template(this.model.toJSON())
    this.$el.html(html)

    return this
  }

})

let song = new SongModel({title: 'Yay'})

let songView = new SongView({el: appRoot, model: song})
songView.render()