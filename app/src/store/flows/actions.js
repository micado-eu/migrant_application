import client from 'api-flows-client'
/*
export function someAction (context) {
}
*/
export function fetchFlows (state, payload) {
  return client
    .fetchFlows(payload.defaultLang, payload.userLang)
    .then(flows => {
      state.commit('setFlows', flows)
      return flows
    })
}

export function fetchDocuments (state, payload) {
  return client
    .fetchDocuments(payload.defaultLang, payload.userLang)
    .then(flows => state.commit('setDocuments', flows))
}
