export function setInformation(state, information) {
  for (let i = 0; i < information.length; i++) {
    if (information[i].translations) {
      for (let j = 0; j < information[i].translations.length; j++) {
        information[i].translations[j].title = information[i].translations[j]['information'];
        delete information[i].translations[j].information;
      }
    }
  }
  state.information = information
}