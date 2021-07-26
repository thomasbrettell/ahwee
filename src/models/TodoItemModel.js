import Backbone from 'backbone'
import _ from 'underscore'

const TodoItemModel = Backbone.Model.extend({
  defaults: {
    completed: false,
    userId: 1
  },

  urlRoot: 'https://jsonplaceholder.typicode.com/todos',

  validate: function(attrs) {
    if(!attrs.title) {
      return 'wtf are you doing!! there needs to be a description'
    }
  },

  toggle: function() {
    if(!this.get('completed')) {
      this.set('completed', true)
    } else {
      this.set('completed', false)
    }
  }
})

export default TodoItemModel
