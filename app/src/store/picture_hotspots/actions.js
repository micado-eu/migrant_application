import client from 'api-picture_hotspots-client'

/*
export function someAction (context) {
}
*/
export function fetchHotspots(state, data) {
  return client
    .fetchComments()
    .then(picture_hotspots => state.commit('setHotspots', picture_hotspots))
}
export function fetchHotspotsById(state, tenant_id) {
  return client
    .fetchDocumentTypePicturesById(tenant_id)
    .then(picture_hotspots => state.commit('setHotspots', picture_hotspots))
}

