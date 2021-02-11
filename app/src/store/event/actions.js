import client from 'api-event-client'

export function fetchEvents(state, data) {
  return client
    .fetchEvents(data.defaultLang, data.userLang)
    .then(event => {
      return state.commit('setEvents', event)
    })
}