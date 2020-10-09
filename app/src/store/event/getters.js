export function events(state) {
  return state.events
}

export function eventElemById(state) {
  let getterFunc = function (id) {
    return state.events.filter(n => n.id == id)[0]
  }
  return getterFunc
}