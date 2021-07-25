import Backbone from 'backbone'
import _ from 'underscore'
import TodoItemTemplate from '../templates/TodoItemTemplate'

const TodoItemModelView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(options) {
    if(!(options && options.model)) {
      throw new Error('Wtf bro add a model')
    }
    this.model.on('change', this.render, this)
  },

  events: {
    'click input[type=checkbox]': 'checkClickHandler',
    'click button[type=delete]': 'deleteClickHandler'
  },

  checkClickHandler: function() {
    this.model.toggle()
    this.model.save()
  },

  deleteClickHandler: function() {
    this.model.destroy()
  },

  render: function() {
    let checked = this.model.get('completed') ? 'checked' : ''
    let template = _.template(TodoItemTemplate(checked))
    let html = template(this.model.toJSON())
    this.$el.html(html)

    this.$('span').toggleClass('complete', this.model.get('completed'))
    this.model.set('rootElement', this.el)
    return this
  }
})

export default TodoItemModelView