import client from 'api-event-client'

export function fetchEvents(state, data) {
  return client
    .fetchEvents()
    .then(event => {
      return state.commit('setEvents', event)
    })
}