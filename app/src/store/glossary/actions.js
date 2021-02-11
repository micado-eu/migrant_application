import client from 'api-glossary-client'

export function fetchGlossary(state, data) {
  return client
    .fetchGlossary(data.defaultLang, data.userLang)
    .then(glossary => state.commit('setGlossary', glossary))
}
