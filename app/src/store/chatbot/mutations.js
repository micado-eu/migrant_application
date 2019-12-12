
//export function someMutation (state) {
export function setMessages (state, messages) {
        state.messages = messages
}

export function addMessage (state, message) {
  state.messages.push(message)
}
