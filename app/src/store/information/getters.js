export function information(state) {
  return state.information
}

export function informationElemById(state) {
  let getterFunc = function (id) {
    return state.information.filter(n => n.id == id)[0]
  }
  return getterFunc
}