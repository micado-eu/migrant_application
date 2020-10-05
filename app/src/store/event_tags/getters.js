export function eventTags(state) {
    return state.events_tags
}

export function eventTagsByEvent(state) {
    return function (eventId) {
        return state.event_tags.filter(tag => tag.eventId === eventId)
    }
}