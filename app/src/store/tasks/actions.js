import client from 'api-tasks-client'
/*
export function someAction (context) {
}
*/
export function fetchTasks (state, data) {
      return client
        .fetchTasks()
        .then(tasks => state.commit('setTasks', tasks))
    }
