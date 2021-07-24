import Backbone from 'backbone'
import _ from 'underscore'

const TodoItemModel = Backbone.Model.extend({
  validate: function(attrs) {
    if(!attrs.description) {
      return 'wtf are you doing!! there needs to be a description'
    }
  }
})

export default TodoItemModel
