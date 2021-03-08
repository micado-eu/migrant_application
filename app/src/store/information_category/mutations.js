export function setCategoryType(state, information_category) {
  for (let i = 0; i < information_category.length; i++) {
    information_category[i].category = information_category[i]['information_category']
    delete information_category[i].information_category
  }
  state.information_category = information_category
}
