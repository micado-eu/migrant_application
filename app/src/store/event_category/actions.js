import client from 'api-event_category-client'

export function fetchEventCategory(state, data) {
  return client
    .fetchEventCategory()
    .then(event_category => state.commit('setCategoryType', event_category))
}