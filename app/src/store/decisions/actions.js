import client from 'api-decisions-client'
/*
export function someAction (context) {
}
*/
export function fetchDecisions(state, data) {
  return client
    .fetchDecisions()
    .then(decisions => state.commit('setDecisions', decisions))
}
