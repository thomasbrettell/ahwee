import Backbone from 'backbone'
import _ from 'underscore'
import $ from 'jquery'
import TodoItemModel from '../models/TodoItemModel'
import TodoItemModelView from './TodoItemModelView'
import TodoItemsTemplate from '../templates/TodoItemsTemplate'

const TodoItemCollectionView = Backbone.View.extend({
  className: 'todo-list',

  initialize: function(options) {
    if(!(options && options.collection)) {
      throw new Error('wtf theres no collection in this collection')
    }

    this.collection.on('add', this.onAddTodoItem, this);
    this.collection.on('remove', this.onRemoveTodoItem, this)
  },

  onAddTodoItem: function(item) {
    let view = new TodoItemModelView({model: item})
    this.$('ul').append(view.render().$el)
  },

  onRemoveTodoItem: function(item) {
    $(item.attributes.rootElement).remove()
  },

  events: {
    'keypress input[type=text]': 'keyPressHandler'
  },

  keyPressHandler: function(e) {
    if(e.originalEvent.key === 'Enter') {
      let $textField = this.$('input[type=text]')

      if($textField.val().trim().length != 0) {
        let todoItem = new TodoItemModel({title: $textField.val()})
        $textField.val('')
        this.collection.create(todoItem)
      }
    }
  },

  render: function() {
    let template = _.template(TodoItemsTemplate())
    let html = template(this.collection.toJSON())
    this.$el.html(html)

    return this
  }
})

export default TodoItemCollectionView