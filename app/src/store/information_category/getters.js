export function informationCategories(state) {
  return state.information_category
}

export function informationCategory(state) {
  return idx => state.information_category.filter((ic) => ic.id === idx)[0]
}