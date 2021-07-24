import $ from 'jquery'
import _ from 'underscore'
import TodoItemModel from './models/TodoItemModel'
import TodoItemCollection from './collections/TodoItemCollection'
import TodoItemCollectionView from './views/TodoItemCollectionView'

const appRoot = $('#app-root')

let todoItems = new TodoItemCollection([
  new TodoItemModel({description: 'yay'}),
  new TodoItemModel({description: 'v cool'}),
  new TodoItemModel({description: 'Niiiiice'})
])

let todoItemsView = new TodoItemCollectionView({collection: todoItems})

export default function initialse() {
  appRoot.append(todoItemsView.render().$el)
}