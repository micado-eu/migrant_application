import client from 'api-news-client'

export function fetchNews(state, data) {
  return client
    .fetchNews()
    .then(news => state.commit('setNews', news))
}