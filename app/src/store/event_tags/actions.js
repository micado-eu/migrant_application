import client from 'api-event_tags-client'

export function fetchEventTags(state, data) {
  return client
    .fetchEventTags()
    .then(events_tags => state.commit('setTagsType', events_tags))
}
