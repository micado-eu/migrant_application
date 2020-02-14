import client from 'api-services-client'
/*
export function someAction (context) {
}
*/
export function fetchServices(state, data) {
  return client
    .fetchServices()
    .then(services => state.commit('setServices', services))
}
