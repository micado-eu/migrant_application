export function setSearchResults(state, results) {
  for (let i = 0; i < results.information.length; i++) {
    results.information[i].title = results.information[i]['information'];
    delete results.information[i].information;
  }
  for (let i = 0; i < results.events.length; i++) {
    results.events[i].title = results.events[i]['event'];
    delete results.events[i].event;
  }
  state.results = results
}

export function emptyResults(state, data) {
  state.results = undefined
}