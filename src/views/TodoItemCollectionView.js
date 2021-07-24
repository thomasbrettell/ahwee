import Backbone from 'backbone'
import _ from 'underscore'
import TodoItemModel from '../models/TodoItemModel'
import TodoItemModelView from './TodoItemModelView'

const TodoItemCollectionView = Backbone.View.extend({
  tagName: 'ul',

  className: 'todo-items-list',

  initialize: function(options) {
    if(!(options && options.collection)) {
      throw new Error('wtf theres no collection in this collection')
    }

    this.collection.on('add', this.onAddTodoItem, this);
  },

  onAddTodoItem: function(item) {
    let view = new TodoItemModelView({model: item})
    this.$el.append(view.render().$el)
  },

  events: {
    'click button[type=add]': 'addClickHandler'
  },

  addClickHandler: function() {
    let todoItem = new TodoItemModel({description: this.$('input[type=text]').val()})
    this.$('input[type=text]').val('')

    this.collection.add(todoItem)
  },

  render: function() {
    let self = this

    this.$el.prepend(`
      <input type='text'>
      <button type='add'>Add</button>
    `)

    this.collection.each(function(item) {
      let todoItemView = new TodoItemModelView({model: item})
      self.$el.append(todoItemView.render().$el)
    })

    return this
  }
})

export default TodoItemCollectionView