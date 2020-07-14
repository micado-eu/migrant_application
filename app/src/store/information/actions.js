import client from 'api-information-client'

export function fetchInformation(state, data) {
  return client
    .fetchEvents()
    .then(information => {
      return state.commit('setInformation', information)
    })
}