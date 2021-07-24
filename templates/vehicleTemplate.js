export function vehicleTemplate() {
  return(`
    <%= number %>
    <button type='delete'>Delete</button>
  `)
}

export function newVehicleTemplate() {
  return(`
    <label>New vehicle</label>
    <input type='text'></input>
    <button type='add'>Add new vehicle</button>
  `)
}

export function carTemplate() {
  return(`
  Car: <%= title %>
  `)
}

export function boatTemplate() {
  return(`
  Boat: <%= title %>
  `)
}