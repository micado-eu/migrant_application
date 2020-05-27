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
import Settings from 'pages/Settings.vue'
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

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: Index },
      { path: '/documents', component: DocumentWallet },
      { path: '/documents/add', component: AddDocument },
      { path: '/documents/edit/:id', component: AddDocument, props: true, name: document },
      { path: '/services', component: Services },
      { path: '/flows', component: Flows },
      { path: '/processes', component: Processes },
      { path: '/processes/:id', component: ProcessViewer, props: true, name: document },
      { path: '/notifications', component: Notifications },
      { path: '/speech', component: Speech },
      { path: '/gioppo', component: Home },
      { path: '/login', component: Gioppo },
      { path: '/tasks', component: Tasks },
      { path: '/chatbot', component: Chatbot },
      { path: '/settings', component: Settings },
      { path: '/certificates', component: Certificates, props: true, name: 'certificates' },
      { path: '/map', component: MapView },
      { path: '/glossary/:id?', component: Glossary },
      { path: '/documents/:id', component: DocumentViewerComponent, props: true, name: document },
      { path: '/decision', component: DecisionTreePage },
      { path: '/information', component: InformationCentre },
      { path: '/information/:id', component: InformationItem },
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
