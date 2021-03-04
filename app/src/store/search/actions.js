import client from 'api-search-client'

export function search(state, payload) {
  let words = payload.words
  words = words.replace(" ", ",")
  return client
    .search(payload.lang, words)
    .then(results => state.commit('setSearchResults', results))
}

export function emptyResults(state, payload) {
  return state.commit('emptyResults')
}
