import Backbone from 'backbone'
import _ from 'underscore'
import TodoItemModel from '../models/TodoItemModel'

const TodoItemCollection = Backbone.Collection.extend({
  model: TodoItemModel,

  url: 'https://jsonplaceholder.typicode.com/todos'
})

export default TodoItemCollection