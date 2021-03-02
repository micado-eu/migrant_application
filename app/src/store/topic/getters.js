export function topics(state) {
    return state.topic
  }


  export const show_topics = (state) => (index) => {
    // it's an example
    return state.topic.filter((top)=>{
      return top.father == index
    })
}