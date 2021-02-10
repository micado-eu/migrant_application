export function setInformation(state, information) {
  for (let i = 0; i < information.length; i++) {
    information[i].title = information[i]['information'];
    delete information[i].information;
  }
  state.information = information
}