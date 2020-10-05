import Index from 'pages/Index.vue'
import Documents from 'pages/Documents.vue'
import Services from 'pages/Services.vue'
import Flows from 'pages/Flows.vue'
import Notifications from 'components/Notifications.vue'
import Speech from 'pages/Speech.vue'
import Gioppo from 'pages/Gioppo.vue'
import Home from 'pages/Home.vue'
import Tasks from 'pages/Tasks.vue'
import Chatbot from 'pages/Chatbot.vue'
import ProfileSettings from 'pages/ProfileSettings.vue'
import Certificates from 'pages/Certificates.vue'
import MapView from 'components/Map.vue'
import Glossary from 'pages/Glossary.vue'
import DecisionTreePage from 'pages/DecisionTreePage.vue'
import Processes from 'pages/Processes.vue'
import DocumentWallet from 'pages/DocumentWallet'
import DocumentViewerComponent from 'components/DocumentViewerComponent'
import AddDocument from 'components/AddDocument'
import ProcessViewer from 'pages/ProcessViewer'
import InformationCentre from 'pages/InformationCentre'
import InformationItem from 'pages/InformationItem'
import Reserved from 'pages/Reserved'
import Events from 'pages/Events'
import EventItem from 'pages/EventItem'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: Index },
      { path: '/documents', component: DocumentWallet, meta: { auth: true } },
      { path: '/documents/add', component: AddDocument, meta: { auth: true } },
      { path: '/documents/:thedocid', name: 'viewdocument', component: () => import('components/DocumentViewerComponent.vue'), props: (route) => ({ ...route.params }), meta: { auth: true } },
      //{ path: '/documents/edit/:id', component: AddDocument, props: true, name: document, meta: { auth: true } },
      { path: '/services', component: Services },
      { path: '/flows', component: Flows },
      { path: '/processes', component: Processes },
      { path: '/processes/:processid', name: 'document', component: ProcessViewer,  props: (route) => ({ ...route.params }),  },
      { path: '/notifications', component: Notifications },
      { path: '/speech', component: Speech },
      { path: '/reserved', component: Reserved },
      { path: '/login', component: Gioppo },
      { path: '/tasks', component: Tasks, meta: { auth: false } },
      { path: '/chatbot', component: Chatbot },
      { path: '/settings', component: ProfileSettings, meta: { auth: true } },
      { path: '/certificates', component: Certificates, props: true, name: 'certificates' },
      { path: '/map', component: MapView },
      { path: '/glossary/:id?', component: Glossary },
      { path: '/documents/edit/:thedocid', component: () => import('components/AddDocument.vue'), props: (route) => ({ ...route.params }), name: 'editdocument', meta: { auth: true } },
      { path: '/decision', component: DecisionTreePage },
      { path: '/information', component: InformationCentre },
      { path: '/information/:id', component: InformationItem },
      { path: '/events', component: Events },
      { path: '/events/:id', component: EventItem },
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
