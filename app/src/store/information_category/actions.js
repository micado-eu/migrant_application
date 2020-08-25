import client from 'api-information_category-client'

export function fetchInformationCategory(state, data) {
  return client
    .fetchInformationCategory()
    .then(information_category => state.commit('setCategoryType', information_category))
}