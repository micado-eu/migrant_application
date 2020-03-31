import Index from 'pages/Index.vue'
import Documents from 'pages/Documents.vue'
import Services from 'pages/Services.vue'
import Flows from 'pages/Flows.vue'
import Notifications from 'components/Notifications.vue'
import Speech from 'pages/Speech.vue'
import Gioppo from 'pages/Gioppo.vue'
import Tasks from 'pages/Tasks.vue'
import Chatbot from 'pages/Chatbot.vue'
import Settings from 'pages/Settings.vue'
import Certificates from 'pages/Certificates.vue'
import MapView from 'components/Map.vue'
import Glossary from 'pages/Glossary.vue'
import DecisionTreePage from 'pages/DecisionTreePage.vue'
import Processes from 'pages/Processes.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: Index },
      { path: '/documents', component: Documents },
      { path: '/services', component: Services },
      { path: '/flows', component: Flows },
      { path: '/processes', component: Processes },
      { path: '/notifications', component: Notifications },
      { path: '/speech', component: Speech },
      { path: '/gioppo', component: Gioppo },
      { path: '/tasks', component: Tasks },
      { path: '/chatbot', component: Chatbot },
      { path: '/settings', component: Settings },
      { path: '/certificates', component: Certificates, props: true, name: 'certificates' },
      { path: '/map', component: MapView },
      { path: '/glossary', component: Glossary },
      { path: '/decision', component: DecisionTreePage },
    ]
  }
  /*,
  {
    path: '/documents',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Documents.vue') }
    ]
  },
  {
    path: '/services',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Services.vue') }
    ]
  },
  {
    path: '/flows',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Flows.vue') }
    ]
  },
  {
    path: '/notifications',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Notifications.vue') }
    ]
  },
  {
    path: '/map',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Map.vue') }
    ]
  },
  {
    path: '/chatbot',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Chatbot.vue') }
    ]
  }*/
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
