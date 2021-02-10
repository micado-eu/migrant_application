export function setEvents(state, events) {
  for (let i = 0; i < events.length; i++) {
    events[i].title = events[i]['event']
    delete events[i].event
  }
  state.events = events
}