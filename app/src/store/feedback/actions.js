import client from 'api-feedback-client'

export function saveFeedback (state, payload) {
  return client
    .saveFeedback(payload)
}
export function saveRatings (state, payload) {
  return client
    .saveRatings(payload)
}
