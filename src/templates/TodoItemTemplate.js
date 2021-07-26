function TodoItemTemplate(checked) {
  return (`
    <label>
      <input type='checkbox' ${checked}>
      <span><%= title %></span>
    </label>
    <button type='delete'>Delete</button>
  `)
}

export default TodoItemTemplate