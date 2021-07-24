import Backbone from "backbone"
import _ from 'underscore'

export const person = {
  name: 'Tom',

  walk: function() {
    this.trigger('walking', {
      speed: 100
    })
  }
}

_.extend(person, Backbone.Events)

person.on('walking', function(e) {
  console.log(`person walking at a speed level of: ${e.speed}`)
})