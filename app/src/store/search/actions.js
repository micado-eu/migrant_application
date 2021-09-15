import client from 'api-search-client'

export function search(state, payload) {
  let words = payload.words
  words = words.replace(" ", ",")
  return client
    .search(payload.lang, words)
    .then(results => state.commit('setSearchResults', results))
}

export function searchFull(state, payload) {
  let words = payload.words
  words = words.replace(" ", ",")
  payload.topicid = 0
  /*if(payload.topicid == null){
    payload.topicid = 0
  }*/
  return client
    .searchFull(payload.lang, words, payload.topicid)
    .then(results => state.commit('setSearchResults', results))
}

export function emptyResults(state, payload) {
  return state.commit('emptyResults')
}
