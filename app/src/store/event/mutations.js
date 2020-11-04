export function setEvents(state, events) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].translations) {
      for (let j = 0; j < events[i].translations.length; j++) {
        events[i].translations[j].title = events[i].translations[j]['event'];
        delete events[i].translations[j].event;
      }
    }
  }
  state.events = events
}