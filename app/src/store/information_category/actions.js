import client from 'api-information_category-client'

export function fetchInformationCategory(state, data) {
  return client
    .fetchInformationCategory(data.defaultLang, data.userLang)
    .then(information_category => state.commit('setCategoryType', information_category))
}

export function fetchSingleInformationCategory(state, data) {
  return client
    .fetchSingleInformationCategory()
    .then(information_category => state.commit('setSingleInformationCategory', information_category))
}