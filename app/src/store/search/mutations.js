export function setSearchResults(state, results) {
  state.services = results
}

export function emptyResults(state, data) {
  state.services = undefined
}