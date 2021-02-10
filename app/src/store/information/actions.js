import client from 'api-information-client'

export function fetchInformation(state, data) {
  return client
    .fetchInformation(data.defaultLang, data.userLang)
    .then(information => {
      return state.commit('setInformation', information)
    })
}