import client from 'api-language-client'

export function fetchActiveLanguages (state) {
  return client
    .fetchActiveLanguages()
    .then(languages => state.commit('setActiveLanguages', languages))
}
