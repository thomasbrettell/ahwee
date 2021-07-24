import Backbone from 'backbone'
import _ from 'underscore'
import TodoItemTemplate from '../templates/TodoItemTemplate'

const TodoItemModelView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(options) {
    if(!(options && options.model)) {
      throw new Error('Wtf bro add a model')
    }
  },

  render: function() {
    let template = _.template(TodoItemTemplate())
    let html = template(this.model.toJSON())
    this.$el.html(html)

    return this
  }
})

export default TodoItemModelView