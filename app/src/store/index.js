import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import example from './module-example'
import chatbot from './chatbot'
import auth from './auth'
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
import information from './information'
import information_category from './information_category'
import information_tags from './information_tags'
import event from './event'
import event_category from './event_category'
import event_tags from './event_tags'
import settings from './settings'
import document_type from './document_type'
import comments from './comments'
import picture_hotspots from './picture_hotspots'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      auth,
      chatbot,
      flows,
      services,
      features,
      tasks,
      glossary,
      documents,
      decisions,
      language,
      graphs,
      topic,
      comments,
      user_type,
      intervention_plan,
      settings,
      information,
      information_category,
      information_tags,
      document_type,
      picture_hotspots,
      event_tags,
      event_category,
      event
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [createPersistedState()]
  })

  return Store
}
