export function setCategoryType(state, event_category) {
  for (let i = 0; i < event_category.length; i++) {
    event_category[i].category = event_category[i]['event_category']
    delete event_category[i].event_category
  }
  state.event_category = event_category
}
