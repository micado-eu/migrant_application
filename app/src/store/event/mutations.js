export function setEvents(state, events) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].translations) {
      for (let j = 0; j < events[i].translations.length; j++) {
        events[i].translations[j].title = events[i].translations[j]['event'];
        delete events[i].translations[j].event;
        if (events[i].translations[j].description !== "") {
          events[i].translations[j].description = JSON.parse(events[i].translations[j].description)
        }
      }
    }
  }
  state.events = events
}