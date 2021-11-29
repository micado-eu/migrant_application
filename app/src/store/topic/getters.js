export function topics(state) {
    return state.topic
  }


  export const show_topics = (state) => (index) => {
    // it's an example
    return state.topic.filter((top)=>{
      return top.father == index
    })
}

export function sortedByFater(state) {
var fathers = state.topic.filter((top)=>{
  return top.father == null
})
var sons = state.topic.filter((top)=>{
  return top.father != null
})
var sorted_topics = []
fathers.forEach((fat)=>{
  sorted_topics.push(fat)
})
sons.forEach((fat)=>{
  sorted_topics.push(fat)
})
return sorted_topics
}