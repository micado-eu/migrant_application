export function news(state) {
  return state.news
}

export function newsElemById(state) {
  let getterFunc = function (id) {
    return state.news.filter(n => n.id == id)[0]
  }
  return getterFunc
}