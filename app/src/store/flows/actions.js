import client from 'api-flows-client'
import flows from '.'
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

export function fetchFlowsTemp (state, data) {
  return client
    .fetchFlowsTemp(data.defaultLang, data.userLang)
    .then(flows => {
      state.commit('setFlowsTemp', flows)
      return flows
    })
}

export function fetchDocuments (state, payload) {
  return client
    .fetchDocuments(payload.defaultLang, payload.userLang)
    .then(flows => state.commit('setDocuments', flows))
}


export function fetchGraph (state, payload) {
  return client
    .fetchGraph(payload.id, payload.userLang, payload.defaultLang)
    .then(graph => {
      state.commit('graphs/setGraphs', graph, { root: true })
      return graph
    })
}

