/*
export function someMutation (state) {
}
*/
export function setSettings (state, settings) {
  if (settings) {
    state.settings = settings
  }
}
export function setMixedSettings (state, settings) {
  if (settings) {
    state.mixed_settings = settings
  }
}
