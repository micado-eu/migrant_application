import client from 'api-information-client'

export function fetchInformation(state, data) {
  return client
    .fetchInformation()
    .then(information => {
      return state.commit('setInformation', information)
    })
}