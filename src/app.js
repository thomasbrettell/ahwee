import $ from 'jquery'
import _ from 'underscore'
import TodoItemCollection from './collections/TodoItemCollection'
import TodoItemCollectionView from './views/TodoItemCollectionView'

const appRoot = $('#app-root')

let todoItems = new TodoItemCollection()
todoItems.fetch()

let todoItemsView = new TodoItemCollectionView({collection: todoItems})

export default function initialse() {
  appRoot.append(todoItemsView.render().$el)
}