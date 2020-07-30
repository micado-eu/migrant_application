import client from 'api-information_tags-client'

export function fetchInformationTags(state, data) {
  return client
    .fetchInformationTags()
    .then(information_tags => state.commit('setTagsType', information_tags))
}
