import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import chatbot from './chatbot'
import documents from './documents'
import flows from './flows'
import services from './services'
import glossary from './glossary'
import tasks from './tasks'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      chatbot,
      flows,
      services,
      glossary,
      tasks,
      documents
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
