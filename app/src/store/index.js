import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import chatbot from './chatbot'
import documents from './documents'
import flows from './flows'
import services from './services'
import features from './features'
import glossary from './glossary'
import tasks from './tasks'
import decisions from './decisions'
import language from './language'
import graphs from './graphs'
import topic from './topic'
import user_type from './user_type'
import intervention_plan from './intervention_plan'

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
      features,
      glossary,
      tasks,
      documents,
      decisions,
      language,
      graphs,
      topic,
      user_type, 
      intervention_plan
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
