import client from 'api-settings-client'
/*
export function someAction (context) {
}
*/
export function fetchSettings (state, data) {
  return client
    .fetchSettings()
    .then(settings => {
      state.commit('setSettings', settings)
      return settings
    })
}

export function fetchMixedSettings (state, data) {
  return client
    .fetchMixedSettings()
    .then(settings => {
      state.commit('setMixedSettings', settings)
      return settings
    })
}
